/**
 * @file Interfaces - PathObject
 * @module pathe/interfaces/PathObject
 */

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
  base?: string | undefined

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
  dir?: string | undefined

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
  ext?: string | undefined

  /**
   * File name without extension (if any).
   *
   * **Note**: Ignored if {@linkcode base} exists.
   *
   * @example
   *  'index'
   */
  name?: string | undefined

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
  root?: string | undefined
}

export type { PathObject as default }
