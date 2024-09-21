/**
 * @file build
 * @module build/build
 */

import tsconfig from '../tsconfig.build.json' assert { type: 'json' }
import make from './make'

await make({
  entries: [
    {
      dts: 'only',
      entryPoints: [
        'src/*.ts',
        'src/interfaces/*.ts',
        'src/lib/*.ts',
        'src/types/*.ts'
      ]
    },
    {
      dts: false,
      entryPoints: ['src/internal/*.ts', 'src/lib/*.ts', 'src/*.ts']
    }
  ],
  target: ['node18', tsconfig.compilerOptions.target],
  tsconfig: 'tsconfig.build.json',
  write: true
})
