/**
 * @file Plugins - ignore
 * @module build/plugins/ignore
 */

import type { OutputMetadata } from '@flex-development/mkbuild'
import pathe from '@flex-development/pathe'
import { ok } from 'devlop'
import type {
  BuildResult,
  OnLoadArgs,
  OnLoadResult,
  Plugin,
  PluginBuild
} from 'esbuild'

export default plugin

/**
 * Create a plugin to ignore entry points using negated glob syntax.
 *
 * @see {@linkcode Plugin}
 *
 * @return {Plugin}
 *  Entry point ignore plugin
 */
function plugin(): Plugin {
  /**
   * Plugin name.
   *
   * @const {string} pluginName
   */
  const pluginName: string = 'mkbuild:ignore'

  return { name: pluginName, setup }

  /**
   * Ignore entry points using negated glob syntax.
   *
   * @param {PluginBuild} build
   *  [esbuild plugin api](https://esbuild.github.io/plugins)
   * @return {undefined}
   */
  function setup(build: PluginBuild): undefined {
    const {
      absWorkingDir = pathe.cwd(),
      bundle,
      entryPoints
    } = build.initialOptions

    if (!bundle && Array.isArray<string>(entryPoints)) {
      /**
       * Character used to start ignore patterns.
       *
       * @const {string} char
       */
      const char: string = '!'

      /**
       * Ignore patterns.
       *
       * @const {string[]} patterns
       */
      const patterns: string[] = entryPoints
        .filter(entryPoint => entryPoint.startsWith(char))
        .map(entryPoint => entryPoint.slice(1))

      if (patterns.length) {
        build.onEnd(onEnd)
        build.onLoad({ filter: /.*/ }, onLoad)

        build.initialOptions.entryPoints = entryPoints.filter(entryPoint => {
          return !entryPoint.startsWith(char)
        })

        /**
         * @param {BuildResult} result
         *  Build result
         * @return {undefined}
         */
        function onEnd(result: BuildResult): undefined {
          ok(result.metafile, 'expected `result.metafile`')
          ok(result.outputFiles, 'expected `result.outputFiles`')

          result.outputFiles = result.outputFiles.filter(output => {
            /**
             * Relative path to output file.
             *
             * @const {string} outfile
             */
            const outfile: string = getOutfile(absWorkingDir, output.path)
            /**
             * Output metadata.
             *
             * @const {OutputMetadata} metadata
             */
            const metadata: OutputMetadata = result.metafile!.outputs[outfile]!

            ok(metadata, 'expected `metadata`')

            for (const input of Object.keys(metadata.inputs)) {
              if (pathe.matchesGlob(input, patterns)) {
                delete result.metafile!.inputs[input]
                delete result.metafile!.outputs[outfile]
                return false
              }
            }

            return true
          })

          return void result
        }

        /**
         * @param {OnLoadArgs} args
         *  Load arguments
         * @return {OnLoadResult | undefined}
         *  Load result or `undefined`
         */
        function onLoad(args: OnLoadArgs): OnLoadResult | undefined {
          /**
           * Relative path to output file.
           *
           * @const {string} outfile
           */
          const outfile: string = getOutfile(absWorkingDir, args.path)

          if (pathe.matchesGlob(outfile, patterns)) {
            return {
              contents: '',
              loader: 'copy',
              pluginData: patterns,
              pluginName
            }
          }

          return void args
        }
      }
    }

    return void build
  }
}

/**
 * Get the relative path to an output file.
 *
 * @param {string} absWorkingDir
 *  Absolute path to working directory
 * @param {string} path
 *  Absolute path to output file
 * @return {string}
 *  Relative path to output file
 */
function getOutfile(absWorkingDir: string, path: string): string {
  ok(pathe.isAbsolute(absWorkingDir), 'expected `absWorkingDir` to be absolute')
  ok(pathe.isAbsolute(path), 'expected `path` to be absolute')

  ok(
    path.startsWith(absWorkingDir),
    'expected `path` to start with `absWorkingDir`'
  )

  return pathe.toPosix(path).slice(absWorkingDir.length).replace(/^[/\\]/, '')
}
