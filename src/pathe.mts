/**
 * @file pathe
 * @module pathe/pathe
 */

import { delimiterWindows, sepWindows } from '#internal/constants'
import {
  addExt,
  basename,
  changeExt,
  cwd,
  delimiter,
  dirname,
  dot,
  extToValue,
  extname,
  extnames,
  fileURLToPath,
  format,
  formatExt,
  isAbsolute,
  isDeviceRoot,
  isSep,
  isURL,
  join,
  matchesGlob,
  normalize,
  parse,
  pathToFileURL,
  relative,
  removeExt,
  resolve,
  resolveWith,
  root,
  sep,
  toNamespacedPath,
  toPath,
  toPosix
} from '#lib'
import type {
  Pathe,
  PosixPlatformPath,
  WindowsPlatformPath
} from '@flex-development/pathe'

/**
 * POSIX utilities for working with file and directory paths.
 *
 * @const {PosixPlatformPath} posix
 */
const posix: PosixPlatformPath = {
  basename,
  delimiter,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  matchesGlob,
  normalize,
  parse,
  posix: {} as PosixPlatformPath,
  relative,
  resolve,
  sep,
  toNamespacedPath,
  win32: {} as WindowsPlatformPath
}

/**
 * Windows utilities for working with file and directory paths.
 *
 * @const {WindowsPlatformPath} win32
 */
const win32: WindowsPlatformPath = {
  basename,
  delimiter: delimiterWindows,
  dirname,
  extname,
  format,
  isAbsolute,
  join,
  matchesGlob,
  normalize,
  parse,
  posix: {} as PosixPlatformPath,
  relative,
  resolve,
  sep: sepWindows,
  toNamespacedPath,
  win32: {} as WindowsPlatformPath
}

// @ts-expect-error ts(2540): init.
posix.win32 = win32.win32 = win32
// @ts-expect-error ts(2540): init.
posix.posix = win32.posix = posix

// @ts-expect-error ts(2339): legacy internal API, docs-only deprecated: DEP0080
posix._makeLong = posix.toNamespacedPath
// @ts-expect-error ts(2339): legacy internal API, docs-only deprecated: DEP0080
win32._makeLong = win32.toNamespacedPath

/**
 * Utilities for working with directory paths, file paths, and file extensions.
 *
 * @const {Pathe} pathe
 */
const pathe: Pathe = {
  addExt,
  basename,
  changeExt,
  cwd,
  delimiter,
  dirname,
  dot,
  extToValue,
  extname,
  extnames,
  fileURLToPath,
  format,
  formatExt,
  isAbsolute,
  isDeviceRoot,
  isSep,
  isURL,
  join,
  matchesGlob,
  normalize,
  parse,
  pathToFileURL,
  posix,
  relative,
  removeExt,
  resolve,
  resolveWith,
  root,
  sep,
  toNamespacedPath,
  toPath,
  toPosix,
  win32
}

export { pathe as default, posix, win32 }
