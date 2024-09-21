/**
 * @file Plugins - fullySpecified
 * @module build/plugins/fullySpecified
 */

import type { OutputMetadata } from '@flex-development/mkbuild'
import {
  extractStatements,
  resolveModule,
  toRelativeSpecifier
} from '@flex-development/mlly'
import pathe from '@flex-development/pathe'
import { ok } from 'devlop'
import type { BuildResult, OutputFile, Plugin, PluginBuild } from 'esbuild'
import { pathToFileURL } from 'node:url'

/**
 * Create a plugin to add file extensions to *relative specifiers*.
 *
 * @see https://nodejs.org/api/esm.html#terminology
 *
 * @return {Plugin}
 *  Specifier extension plugin
 */
function plugin(): Plugin {
  return { name: 'mkbuild:fully-specified', setup }

  /**
   * Add file extensions to relative specifiers in output file content.
   *
   * @todo fix extension handling
   *
   * @param {PluginBuild} build
   *  [esbuild plugin api](https://esbuild.github.io/plugins)
   * @param {BuildOptions} build.initialOptions
   *  [esbuild build api](https://esbuild.github.io/api/#build-api) options
   * @param {PluginBuild['onEnd']} build.onEnd
   *  Build end callback
   * @return {undefined}
   */
  function setup(build: PluginBuild): undefined {
    return void build.onEnd(async (result: BuildResult): Promise<undefined> => {
      const {
        absWorkingDir,
        bundle,
        conditions,
        format,
        outExtension: { '.js': ext = '.js' } = {},
        preserveSymlinks,
        resolveExtensions
      } = build.initialOptions

      if (!bundle && (format === 'esm' || ['.cjs', '.mjs'].includes(ext))) {
        ok(absWorkingDir, 'expected `absWorkingDir`')
        ok(result.metafile, 'expected `result.metafile`')
        ok(result.outputFiles, 'expected `result.outputFiles`')

        /**
         * Output file objects.
         *
         * @const {OutputFile[]} outputFiles
         */
        const outputFiles: OutputFile[] = []

        for (const output of result.outputFiles) {
          /**
           * Relative path to output file.
           *
           * @const {string} outfile
           */
          const outfile: string = output.path
            .slice(absWorkingDir.length)
            .replace(/^[/\\]/, '')

          /**
           * Output metadata.
           *
           * @const {OutputMetadata} metadata
           */
          const metadata: OutputMetadata = result.metafile.outputs[outfile]!

          ok(metadata, 'expected `metadata`')

          if (!metadata.entryPoint) {
            // because this plugin doesn't handle bundles, the entry point can
            // fallback to the first (and only!) key in metadata.inputs
            metadata.entryPoint = Object.keys(metadata.inputs)[0]!

            if (!metadata.entryPoint) {
              outputFiles.push(output)
              continue
            }
          }

          /**
           * Output text.
           *
           * @var {string} text
           */
          let text: string = output.text

          for (const stmt of extractStatements(text)) {
            if (
              stmt.specifier &&
              /^[./\\]/.test(stmt.specifier) &&
              !stmt.specifier.endsWith(ext)
            ) {
              try {
                /**
                 * Parent URL.
                 *
                 * @const {URL} parent
                 */
                const parent: URL = pathToFileURL(pathe.join(
                  absWorkingDir,
                  metadata.entryPoint
                ))

                /**
                 * Resolved URL.
                 *
                 * @const {URL} url
                 */
                const url: URL = await resolveModule(stmt.specifier, {
                  conditions,
                  ext,
                  extensions: resolveExtensions,
                  parent,
                  preserveSymlinks
                })

                text = text.replace(
                  stmt.code,
                  stmt.code.replace(
                    stmt.specifier,
                    toRelativeSpecifier(url, parent)
                  )
                )
              } catch {
                text = text.replace(
                  stmt.code,
                  stmt.code.replace(stmt.specifier, stmt.specifier + ext)
                )
              }
            }
          }

          Object.defineProperties(output, { text: { get: () => text } })
          output.contents = new TextEncoder().encode(output.text)

          outputFiles.push(output)
        }

        result.outputFiles = outputFiles
      }

      return void result
    })
  }
}

export default plugin
