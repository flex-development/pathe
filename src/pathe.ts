/**
 * @file pathe
 * @module pathe/pathe
 */

import type { Pathe, PlatformPath } from './interfaces'
import {
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  relative,
  resolve,
  sep,
  toNamespacedPath
} from './lib'
import { addExt, changeExt, defaultExt, formatExt, removeExt } from './utils'

/**
 * Utilities for working with file and directory paths.
 *
 * @const {PlatformPath} core
 */
const core: PlatformPath = {
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  normalize,
  parse,
  posix: {} as PlatformPath,
  relative,
  resolve,
  sep,
  toNamespacedPath,
  win32: {} as PlatformPath
}

// add platform-specific objects
// see https://github.com/nodejs/node/blob/v19.3.0/lib/path.js#L1540-L1541
Object.assign(core, { posix: core, win32: core })

/**
 * Utilities for working with directory paths, file paths, and file extensions.
 *
 * @const {Pathe} pathe
 */
const pathe: Pathe = {
  addExt,
  basename: core.basename,
  changeExt,
  defaultExt,
  delimiter: core.delimiter,
  dirname: core.dirname,
  extname: core.extname,
  format: core.format,
  formatExt,
  isAbsolute: core.isAbsolute,
  join: core.join,
  normalize: core.normalize,
  parse: core.parse,
  posix: core,
  relative: core.relative,
  removeExt,
  resolve: core.resolve,
  sep: core.sep,
  toNamespacedPath: core.toNamespacedPath,
  win32: core
}

// add legacy api
// see https://github.com/nodejs/node/blob/v19.3.0/lib/path.js#L1543-L1545
Object.assign(pathe.posix, { _makeLong: toNamespacedPath })
Object.assign(pathe.win32, { _makeLong: toNamespacedPath })

export { pathe as default, core as posix, core as win32 }
