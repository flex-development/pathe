/**
 * @file Configuration - Build
 * @module config/build
 * @see https://github.com/flex-development/mkbuild
 */

import { defineBuildConfig, type Config } from '@flex-development/mkbuild'
import tsconfig from './tsconfig.build.json' with { type: 'json' }

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
        'src/*.mts',
        'src/interfaces/*.mts',
        'src/lib/*.mts',
        'src/types/*.mts'
      ]
    },
    {
      dts: false,
      pattern: [
        '!src/internal/*.d.mts',
        'src/internal/*.mts',
        'src/lib/*.mts',
        'src/*.mts'
      ]
    }
  ],
  target: ['node18', tsconfig.compilerOptions.target],
  tsconfig: 'tsconfig.build.json'
})

export default config
