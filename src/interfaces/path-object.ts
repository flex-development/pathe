/**
 * @file Interfaces - PathObject
 * @module pathe/interfaces/PathObject
 */

import type { Optional } from '@flex-development/tutils'

/**
 * Object representing a path.
 */
interface PathObject {
  /**
   * File name including extension (if any).
   *
   * **Note**: Takes precedence over {@linkcode ext} and {@linkcode name}.
   *
   * @example
   *  'index.html'
   */
  base?: Optional<string>

  /**
   * Directory name or full directory path.
   *
   * **Note**: Takes precedence over {@linkcode root}.
   *
   * @example
   *  'c:\\path\\dir'
   * @example
   * '/home/user/dir'
   */
  dir?: Optional<string>

  /**
   * File extension (if any).
   *
   * **Note**: Ignored if {@linkcode base} exists.
   *
   * @example
   *  '.html'
   * @example
   *  'ts'
   */
  ext?: Optional<string>

  /**
   * File name without extension (if any).
   *
   * **Note**: Ignored if {@linkcode base} exists.
   *
   * @example
   *  'index'
   */
  name?: Optional<string>

  /**
   * Root of path.
   *
   * **Note**: Ignored if {@linkcode dir} is provided.
   *
   * @example
   *  '/'
   * @example
   *  'c:\\'
   */
  root?: Optional<string>
}

export type { PathObject as default }
