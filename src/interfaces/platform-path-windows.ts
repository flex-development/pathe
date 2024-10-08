/**
 * @file Interfaces - WindowsPlatformPath
 * @module pathe/interfaces/WindowsPlatformPath
 */

import type {
  PlatformPath,
  PosixPlatformPath,
  WindowsDelimiter,
  WindowsSep
} from '@flex-development/pathe'

/**
 * Windows utilities for working with file and directory paths.
 *
 * @see {@linkcode PlatformPath}
 *
 * @extends {PlatformPath}
 */
interface WindowsPlatformPath extends PlatformPath {
  /**
   * Path delimiter.
   *
   * @see {@linkcode WindowsDelimiter}
   *
   * @readonly
   */
  readonly delimiter: WindowsDelimiter

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
   * @see {@linkcode WindowsSep}
   *
   * @readonly
   */
  readonly sep: WindowsSep

  /**
   * Windows specific pathing.
   *
   * @readonly
   */
  readonly win32: WindowsPlatformPath
}

export type { WindowsPlatformPath as default }
