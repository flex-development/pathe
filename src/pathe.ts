/**
 * @file pathe
 * @module pathe/pathe
 */

import { delimiterWindows, sepWindows } from '#internal/constants'
import type {
  Pathe,
  PosixPlatformPath,
  WindowsPlatformPath
} from './interfaces'
import {
  addExt,
  basename,
  changeExt,
  cwd,
  delimiter,
  dirname,
  dot,
  extname,
  format,
  formatExt,
  isAbsolute,
  isDeviceRoot,
  isSep,
  join,
  matchesGlob,
  normalize,
  parse,
  relative,
  removeExt,
  resolve,
  resolveWith,
  root,
  sep,
  toNamespacedPath,
  toPosix
} from './lib'

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
  posix: <PosixPlatformPath>{},
  relative,
  resolve,
  sep,
  toNamespacedPath,
  win32: <WindowsPlatformPath>{}
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
  posix: <PosixPlatformPath>{},
  relative,
  resolve,
  sep: sepWindows,
  toNamespacedPath,
  win32: <WindowsPlatformPath>{}
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
  extname,
  format,
  formatExt,
  isAbsolute,
  isDeviceRoot,
  isSep,
  join,
  matchesGlob,
  normalize,
  parse,
  posix,
  relative,
  removeExt,
  resolve,
  resolveWith,
  root,
  sep,
  toNamespacedPath,
  toPosix,
  win32
}

export { pathe as default, posix, win32 }
