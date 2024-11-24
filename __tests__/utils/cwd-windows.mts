/**
 * @file Test Utilities - cwdWindows
 * @module tests/utils/cwdWindows
 */

import DRIVE from '#fixtures/drive'
import { ok } from 'devlop'
import { posix, win32 } from 'node:path'

/**
 * Get the path to the current working directory as a windows drive path.
 *
 * @return {string}
 *  Absolute path to current working directory
 */
function cwdWindows(): string {
  ok(typeof process.env['PWD'] === 'string', 'expected `process.env.PWD`')
  return DRIVE + process.env['PWD'].replaceAll(posix.sep, win32.sep)
}

export default cwdWindows
