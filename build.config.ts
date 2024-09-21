/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import tsconfig from './tsconfig.build.json' assert { type: 'json' }

/**
 * Build configuration options.
 *
 * @const {Config} config
 */
const config: Config = defineBuildConfig({
  entries: [
    {
      dts: 'only',
      pattern: [
        'src/*.ts',
        'src/interfaces/*.ts',
        'src/lib/*.ts',
        'src/types/*.ts'
      ]
    },
    {
      dts: false,
      pattern: ['src/internal/*.ts', 'src/lib/*.ts', 'src/*.ts']
    }
  ],
  target: ['node18', tsconfig.compilerOptions.target],
  tsconfig: 'tsconfig.build.json'
})

export default config
