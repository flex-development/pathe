/**
 * @file Interfaces - ParsedPath
 * @module pathe/interfaces/ParsedPath
 */

import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Object representing significant elements of a path.
 */
interface ParsedPath {
  /**
   * File name including extension (if any).
   *
   * @example
   *  'index.html'
   */
  base: string

  /**
   * Directory name or path.
   *
   * @example
   *  'c:\\path\\dir'
   * @example
   * '/home/user/dir'
   */
  dir: string

  /**
   * File extension (if any).
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @example
   *  '.html'
   * @example
   *  'ts'
   */
  ext: EmptyString | Ext

  /**
   * File name without extension (if any).
   *
   * @example
   *  'index'
   */
  name: string

  /**
   * Root of path.
   *
   * @example
   *  '/'
   * @example
   *  'c:\\'
   */
  root: string
}

export type { ParsedPath as default }
