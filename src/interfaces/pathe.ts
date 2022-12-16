/**
 * @file Interfaces - Pathe
 * @module pathe/interfaces/Pathe
 */

import type { Ext } from '#src/types'
import type { EmptyString, Nullable } from '@flex-development/tutils'
import type PlatformPath from './platform-path'

/**
 * Utilities for working with directory paths, file paths, and file extensions.
 *
 * @extends {PlatformPath}
 */
interface Pathe extends PlatformPath {
  /**
   * Appends a file extension to the given `path` if and only if the path does
   * not already have that exact file extension.
   *
   * Does nothing if a file extension is not provided.
   *
   * @param {string} path - Path to evaluate
   * @param {Nullable<string>} [ext] - File extension to add
   * @return {string} `path` unmodified or with `ext` appended
   * @throws {TypeError} If `path` is not a string or `ext` is not a string
   */
  addExt(path: string, ext?: Nullable<string>): string

  /**
   * Changes the file extension of the given `path`.
   *
   * Does nothing if a file extension isn't provided. If the file extension is
   * an empty string, however, `path`'s file extension will be removed.
   *
   * @param {string} path - Path to evaluate
   * @param {Nullable<string>} [ext] - New file extension
   * @return {string} `path` unmodified or with changed file extension
   * @throws {TypeError} If `path` is not a string or `ext` is not a string
   */
  changeExt(path: string, ext?: Nullable<string>): string

  /**
   * Appends a file extension to the given `path` if and only if the path does
   * not already have an extension. Force adding an extension can be
   * accomplished by passing an array of extensions to ignore.
   *
   * Does nothing if a file extension isn't provided.
   *
   * @param {string} path - Path to evaluate
   * @param {Nullable<string>} [ext] - Default file extension
   * @param {string[]} [ignore] - File extensions to ignore if found
   * @return {string} `path` unmodified or with `ext` appended
   * @throws {TypeError} If `path` is not a string or `ext` is not a string
   */
  defaultExt(path: string, ext?: Nullable<string>, ignore?: string[]): string

  /**
   * Formats a file extension.
   *
   * This includes:
   *
   * - Prepending a `.` (dot) character if not already present
   *
   * Does nothing if a file extension isn't provided.
   *
   * @param {string} [ext=''] - File extension to format
   * @return {EmptyString | Ext} Formatted file extension or empty string
   */
  formatExt(ext?: string): EmptyString | Ext

  /**
   * Removes a file extension from the given `path`.
   *
   * Does nothing if `path` does not end with the provided file extension, or if
   * a file extension isn't provided.
   *
   * @param {string} path - Path to evaluate
   * @param {Nullable<string>} [ext] - File extension to removed
   * @return {string} `path` unmodified or with `ext` removed
   * @throws {TypeError} If `path` is not a string or `ext` is not a string
   */
  removeExt(path: string, ext?: Nullable<string>): string
}

export type { Pathe as default }
