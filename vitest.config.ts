/**
 * @file Vitest Configuration
 * @module config/vitest
 * @see https://vitest.dev/config/
 */

import ci from 'is-ci'
import path from 'node:path'
import tsconfigpaths from 'vite-tsconfig-paths'
import GithubActionsReporter from 'vitest-github-actions-reporter'
import {
  defineConfig,
  type UserConfig,
  type UserConfigExport
} from 'vitest/config'
import { BaseSequencer, type WorkspaceSpec } from 'vitest/node'

/**
 * Vitest configuration export.
 *
 * @const {UserConfigExport} config
 */
const config: UserConfigExport = defineConfig((): UserConfig => {
  /**
   * [`lint-staged`][1] check.
   *
   * [1]: https://github.com/okonet/lint-staged
   *
   * @const {boolean} LINT_STAGED
   */
  const LINT_STAGED: boolean = !!Number.parseInt(process.env.LINT_STAGED ?? '0')

  return {
    define: {},
    plugins: [tsconfigpaths({ projects: [path.resolve('tsconfig.json')] })],
    test: {
      allowOnly: !ci,
      benchmark: {},
      chaiConfig: {
        includeStack: true,
        showDiff: true,
        truncateThreshold: 0
      },
      clearMocks: true,
      coverage: {
        all: !LINT_STAGED,
        clean: true,
        cleanOnRerun: true,
        exclude: [
          '**/__mocks__/**',
          '**/__tests__/**',
          '**/index.ts',
          'src/interfaces/',
          'src/pathe.ts',
          'src/types/'
        ],
        extension: ['.ts'],
        include: ['src'],
        provider: 'v8',
        reporter: [ci ? 'lcovonly' : 'html', 'text'],
        reportsDirectory: './coverage',
        skipFull: false
      },
      environment: 'node',
      environmentOptions: {},
      globalSetup: [],
      globals: true,
      hookTimeout: 10 * 1000,
      include: [
        `**/__tests__/*.${LINT_STAGED ? '{spec,spec-d}' : 'spec'}.{ts,tsx}`
      ],
      isolate: true,
      mockReset: true,
      outputFile: { json: './__tests__/report.json' },
      passWithNoTests: true,
      reporters: [
        'json',
        'verbose',
        ci ? new GithubActionsReporter() : './__tests__/reporters/notifier.ts'
      ],
      /**
       * Stores snapshots next to `file`'s directory.
       *
       * @param {string} file - Path to test file
       * @param {string} extension - Snapshot extension
       * @return {string} Custom snapshot path
       */
      resolveSnapshotPath(file: string, extension: string): string {
        return path.resolve(
          path.resolve(path.dirname(path.dirname(file)), '__snapshots__'),
          path.basename(file).replace(/\.spec.tsx?/, '') + extension
        )
      },
      restoreMocks: true,
      root: process.cwd(),
      sequence: {
        sequencer: class Sequencer extends BaseSequencer {
          /**
           * Determines test file execution order.
           *
           * @public
           * @override
           * @async
           *
           * @param {WorkspaceSpec[]} specs - Workspace spec objects
           * @return {Promise<WorkspaceSpec[]>} `files` sorted
           */
          public override async sort(
            specs: WorkspaceSpec[]
          ): Promise<WorkspaceSpec[]> {
            return (await super.sort(specs)).sort(([, file1], [, file2]) => {
              return file1.localeCompare(file2)
            })
          }
        }
      },
      setupFiles: ['./__tests__/setup/index.ts'],
      silent: false,
      singleThread: true,
      slowTestThreshold: 3000,
      snapshotFormat: {
        callToJSON: true,
        min: false,
        printBasicPrototype: false,
        printFunctionName: true
      },
      testTimeout: 10 * 1000,
      typecheck: {
        allowJs: false,
        checker: 'tsc',
        ignoreSourceErrors: false,
        include: ['**/__tests__/*.spec-d.ts'],
        tsconfig: path.resolve('tsconfig.typecheck.json')
      },
      unstubEnvs: true,
      unstubGlobals: true
    }
  }
})

export default config
