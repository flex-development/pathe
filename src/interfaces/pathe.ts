/**
 * @file Interfaces - Pathe
 * @module pathe/interfaces/Pathe
 */

import type extname from '#lib/extname'
import type {
  ErrInvalidArgType,
  ErrInvalidArgValue,
  ErrInvalidFileUrlHost,
  ErrInvalidFileUrlPath,
  ErrInvalidUrlScheme
} from '@flex-development/errnode'
import type {
  Cwd,
  DeviceRoot,
  Dot,
  EmptyString,
  Ext,
  Sep
} from '@flex-development/pathe'
import type PlatformOptions from './platform-options'
import type PosixPlatformPath from './platform-path-posix'

/**
 * Utilities for working with directory paths, file paths, and file extensions.
 *
 * @see {@linkcode PosixPlatformPath}
 *
 * @extends {PosixPlatformPath}
 */
interface Pathe extends PosixPlatformPath {
  /**
   * Append a file extension to `path`.
   *
   * Does nothing if a file extension is not provided, or the
   * {@linkcode extname} of `path` is already `ext`.
   *
   * @param {string} path
   *  Path to handle
   * @param {string | null | undefined} ext
   *  File extension to add
   * @return {string}
   *  `path` unmodified or with `ext` appended
   */
  addExt(this: void, path: string, ext: string | null | undefined): string

  /**
   * Change the file extension of `path`.
   *
   * Does nothing if a file extension isn't provided.
   * If the file extension is an empty string, however, `path`'s file extension
   * will be removed.
   *
   * @param {string} path
   *  Path to handle
   * @param {string | null | undefined} [ext]
   *  File extension to add
   * @return {string} `path` unmodified or with changed file extension
   * @throws {TypeError} If `path` is not a string or `ext` is not a string
   */
  changeExt(this: void, path: string, ext?: string | null | undefined): string

  /**
   * Get the path to the current working directory.
   *
   * @return {string}
   *  Absolute path to current working directory
   */
  cwd(this: void): string

  /**
   * Dot character (`'.'`).
   *
   * @see {@linkcode Dot}
   *
   * @readonly
   */
  readonly dot: Dot

  /**
   * Get a list of file extensions for `path`.
   *
   * @see {@linkcode Ext}
   * @see {@linkcode extname}
   *
   * @param {string} path
   *  Path to handle
   * @return {Ext[]}
   *  List of extensions
   */
  extnames(path: string): Ext[]

  /**
   * Convert a `file:` URL to a path.
   *
   * @see {@linkcode ErrInvalidArgType}
   * @see {@linkcode ErrInvalidFileUrlHost}
   * @see {@linkcode ErrInvalidFileUrlPath}
   * @see {@linkcode ErrInvalidUrlScheme}
   * @see {@linkcode PlatformOptions}
   *
   * @param {URL | string} url
   *  The file URL string or URL object to convert to a path
   * @param {PlatformOptions | null | undefined} [options]
   *  Platform options
   * @return {string}
   *  `url` as path
   * @throws {ErrInvalidArgType}
   * @throws {ErrInvalidFileUrlHost}
   * @throws {ErrInvalidFileUrlPath}
   * @throws {ErrInvalidUrlScheme}
   */
  fileURLToPath(
    url: URL | string,
    options?: PlatformOptions | null | undefined
  ): string

  /**
   * Format a file extension.
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @param {string | null | undefined} ext
   *  File extension to format
   * @return {EmptyString | Ext}
   *  Formatted file extension or empty string
   */
  formatExt(this: void, ext: string | null | undefined): EmptyString | Ext

  /**
   * Check if `value` is a device root.
   *
   * @see {@linkcode DeviceRoot}
   *
   * @param {unknown} [value]
   *  Value to check
   * @return {value is DeviceRoot}
   *  `true` if `value` is device root, `false` otherwise
   */
  isDeviceRoot(this: void, value: unknown): value is DeviceRoot

  /**
   * Check if `value` is a path segment separator.
   *
   * @see {@linkcode Sep}
   *
   * @param {unknown} [value]
   *  Value to check
   * @return {value is Sep}
   *  `true` if `value` is path segment separator, `false` otherwise
   */
  isSep(this: void, value: unknown): value is Sep

  /**
   * Convert a file `path` to a `file:` {@linkcode URL}.
   *
   * > The following characters are percent-encoded when converting from file
   * > path to a `URL`:
   * >
   * > - %: Only character not encoded by the `pathname` setter
   * > - CR: Stripped out by the `pathname` setter (see [`whatwg/url#419`][419])
   * > - LF: Stripped out by the `pathname` setter (see [`whatwg/url#419`][419])
   * > - TAB: Stripped out by the `pathname` setter
   *
   * [419]: https://github.com/whatwg/url/issues/419
   *
   * @see {@linkcode ErrInvalidArgValue}
   * @see {@linkcode PlatformOptions}
   *
   * @param {URL | string} path
   *  Path to handle
   * @param {PlatformOptions | null | undefined} [options]
   *  Platform options
   * @return {URL}
   *  `path` as `file:` URL
   * @throws {ErrInvalidArgValue}
   */
  pathToFileURL(
    path: string,
    options?: PlatformOptions | null | undefined
  ): URL

  /**
   * Remove the file extension of `path`.
   *
   * Does nothing if `path` does not end with the provided file extension, or if
   * a file extension is not provided.
   *
   * @param {string} path
   *  Path to handle
   * @param {string | null | undefined} ext
   *  File extension to remove
   * @return {string}
   *  `path` unmodified or with `ext` removed
   */
  removeExt(this: void, path: string, ext: string | null | undefined): string

  /**
   * Resolve a sequence of paths or path segments into an absolute path.
   *
   * The given sequence of paths is processed from right to left, with each
   * subsequent path prepended until an absolute path is constructed.
   *
   * For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`,
   * calling `pathe.resolve('/foo', '/bar', 'baz')` would return `/bar/baz`
   * because `'baz'` is not an absolute path, but `'/bar' + '/' + 'baz'` is.
   *
   * If, after processing all given `path` segments, an absolute path has not
   * yet been generated, the current working directory is used.
   *
   * The resulting path is normalized and trailing separators are removed unless
   * the path is resolved to the root directory.
   *
   * Zero-length `path` segments are ignored.
   *
   * If no `path` segments are passed, the absolute path of the current working
   * directory is returned.
   *
   * @see {@linkcode Cwd}
   *
   * @param {ReadonlyArray<string> | string} paths
   *  Sequence of paths or path segments
   * @param {Cwd | null | undefined} [cwd]
   *  Get the path to the current working directory
   * @param {Partial<Record<string, string>> | null | undefined} [env]
   *  Environment variables
   * @return {string}
   *  Absolute path
   */
  resolveWith(
    this: void,
    paths: string | readonly string[],
    cwd?: Cwd | null | undefined,
    env?: Partial<Record<string, string>> | null | undefined
  ): string

  /**
   * Get the root of `path`.
   *
   * @param {string} path
   *  Path to handle
   * @return {string}
   *  Root of `path`
   */
  root(this: void, path: string): string

  /**
   * Make `path` POSIX-compliant.
   *
   * This includes:
   *
   * - Converting Windows-style path delimiters (`;`) to POSIX (`:`)
   * - Converting Windows-style path segment separators (`\`) to POSIX (`/`)
   *
   * @see https://nodejs.org/api/path.html#windows-vs-posix
   * @see https://nodejs.org/api/path.html#pathdelimiter
   * @see https://nodejs.org/api/path.html#pathsep
   *
   * @param {string} path
   *  Path to handle
   * @return {string}
   *  POSIX-compliant `path`
   */
  toPosix(this: void, path: string): string
}

export type { Pathe as default }
