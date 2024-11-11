/**
 * @file Interfaces - FormatInputPathObject
 * @module pathe/interfaces/FormatInputPathObject
 */

/**
 * Object representing a path.
 */
interface FormatInputPathObject {
  /**
   * File name including extension (if any).
   *
   * > 👉 **Note**: Takes precedence over {@linkcode ext} and {@linkcode name}.
   *
   * @example
   *  'index.html'
   */
  base?: string | null | undefined

  /**
   * Directory name or path.
   *
   * > 👉 **Note**: Takes precedence over {@linkcode root}.
   *
   * @example
   *  'c:\\path\\dir'
   * @example
   * '/home/user/dir'
   */
  dir?: string | null | undefined

  /**
   * File extension (if any).
   *
   * > 👉 **Note**: Ignored if {@linkcode base} exists.
   *
   * @example
   *  '.html'
   * @example
   *  'ts'
   */
  ext?: string | null | undefined

  /**
   * File name without extension (if any).
   *
   * > 👉 **Note**: Ignored if {@linkcode base} exists.
   *
   * @example
   *  'index'
   */
  name?: string | null | undefined

  /**
   * Root of path.
   *
   * > 👉 **Note**: Ignored if {@linkcode dir} is provided.
   *
   * @example
   *  '/'
   * @example
   *  'c:\\'
   */
  root?: string | null | undefined
}

export type { FormatInputPathObject as default }
