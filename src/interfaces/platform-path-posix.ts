/**
 * @file Interfaces - PosixPlatformPath
 * @module pathe/interfaces/PosixPlatformPath
 */

import type {
  PlatformPath,
  PosixDelimiter,
  PosixSep,
  WindowsPlatformPath
} from '@flex-development/pathe'

/**
 * POSIX utilities for working with file and directory paths.
 *
 * @see {@linkcode PlatformPath}
 *
 * @extends {PlatformPath}
 */
interface PosixPlatformPath extends PlatformPath {
  /**
   * Path delimiter.
   *
   * @see {@linkcode PosixDelimiter}
   *
   * @readonly
   */
  readonly delimiter: PosixDelimiter

  /**
   * Posix specific pathing.
   *
   * @see {@linkcode PosixPlatformPath}
   *
   * @readonly
   */
  readonly posix: PosixPlatformPath

  /**
   * Path segment separator.
   *
   * @see {@linkcode PosixSep}
   *
   * @readonly
   */
  readonly sep: PosixSep

  /**
   * Windows specific pathing.
   *
   * @see {@linkcode WindowsPlatformPath}
   *
   * @readonly
   */
  readonly win32: WindowsPlatformPath
}

export type { PosixPlatformPath as default }
