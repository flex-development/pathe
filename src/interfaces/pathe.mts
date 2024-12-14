/**
 * @file Interfaces - Pathe
 * @module pathe/interfaces/Pathe
 */

import type {
  ErrInvalidArgValue,
  ErrInvalidFileUrlHost,
  ErrInvalidFileUrlPath,
  ErrInvalidUrlScheme
} from '@flex-development/errnode'
import type {
  DeviceRoot,
  Dot,
  EmptyString,
  Ext,
  FileUrlToPathOptions,
  PathToFileUrlOptions,
  PosixPlatformPath,
  ResolveWithOptions,
  Sep,
  ToPathOptions
} from '@flex-development/pathe'

/**
 * Utilities for working with directory paths, file paths, and file extensions.
 *
 * @see {@linkcode PosixPlatformPath}
 *
 * @extends {PosixPlatformPath}
 */
interface Pathe extends PosixPlatformPath {
  /**
   * Append a file extension to `input`.
   *
   * Does nothing if a file extension is not provided, or the
   * {@linkcode extname} of `input` is already `ext`.
   *
   * @this {void}
   *
   * @param {string} input
   *  The path or URL string to handle
   * @param {string | null | undefined} ext
   *  The file extension to add
   * @return {string}
   *  `input` unmodified or with new extension
   */
  addExt(this: void, input: string, ext: string | null | undefined): string

  /**
   * Append a file extension to `url`.
   *
   * Does nothing if a file extension is not provided, or the
   * {@linkcode extname} of `url` is already `url`.
   *
   * @this {void}
   *
   * @param {URL} url
   *  The {@linkcode URL} to handle
   * @param {string | null | undefined} ext
   *  The file extension to add
   * @return {URL}
   *  `url` unmodified or with new extension
   */
  addExt(this: void, url: URL, ext: string | null | undefined): URL

  /**
   * Append a file extension to `input`.
   *
   * Does nothing if a file extension is not provided, or the
   * {@linkcode extname} of `input` is already `ext`.
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @param {string | null | undefined} ext
   *  The file extension to add
   * @return {URL | string}
   *  `input` unmodified or with new extension
   */
  addExt(
    this: void,
    input: URL | string,
    ext: string | null | undefined
  ): URL | string

  /**
   * Change the file extension of `input`.
   *
   * Does nothing if the file extension of `input` is already `ext`.
   *
   * @this {void}
   *
   * @param {string} input
   *  The path or URL string to handle
   * @param {string | null | undefined} [ext]
   *  The file extension to add
   * @return {string}
   *  `input` unmodified or with changed file extension
   */
  changeExt(this: void, input: string, ext?: string | null | undefined): string

  /**
   * Change the file extension of `url`.
   *
   * Does nothing if the file extension of `url` is already `ext`.
   *
   * @this {void}
   *
   * @param {URL} url
   *  The {@linkcode URL} to handle
   * @param {string | null | undefined} [ext]
   *  The file extension to add
   * @return {URL}
   *  `url` unmodified or with changed file extension
   */
  changeExt(this: void, url: URL, ext?: string | null | undefined): URL

  /**
   * Change the file extension of `input`.
   *
   * Does nothing if the file extension of `input` is already `ext`.
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @param {string | null | undefined} [ext]
   *  The file extension to add
   * @return {URL | string}
   *  `input` unmodified or with changed file extension
   */
  changeExt(
    this: void,
    input: URL | string,
    ext?: string | null | undefined
  ): URL | string

  /**
   * Get the path to the current working directory.
   *
   * @this {void}
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
   * Get a value for `input` based on its file extension.
   *
   * This algorithm picks the value with the longest matching file extension,
   * so if `map` has the keys `'.mts'` and `'.d.mts'`, the value for `'.d.mts'`
   * will be returned.
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @template {any} T
   *  Map value
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @param {Partial<Record<EmptyString | Ext, T>>} map
   *  Extension map
   * @return {T | undefined}
   *  Value for `input` or `undefined`
   */
  extToValue<T>(
    this: void,
    input: URL | string,
    map: Partial<Record<EmptyString | Ext, T>>
  ): T | undefined

  /**
   * Get a list of file extensions for `input`.
   *
   * @see {@linkcode Ext}
   * @see {@linkcode extname}
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @return {Ext[]}
   *  List of extensions
   */
  extnames(this: void, input: URL | string): Ext[]

  /**
   * Convert a `file:` URL to a path.
   *
   * @see {@linkcode ErrInvalidFileUrlHost}
   * @see {@linkcode ErrInvalidFileUrlPath}
   * @see {@linkcode ErrInvalidUrlScheme}
   * @see {@linkcode FileUrlToPathOptions}
   *
   * @this {void}
   *
   * @param {URL | string} url
   *  The `file:` URL object or string to convert to a path
   * @param {FileUrlToPathOptions | null | undefined} [options]
   *  Conversion options
   * @return {string}
   *  `url` as path
   * @throws {ErrInvalidFileUrlHost}
   * @throws {ErrInvalidFileUrlPath}
   * @throws {ErrInvalidUrlScheme}
   */
  fileURLToPath(
    this: void,
    url: URL | string,
    options?: FileUrlToPathOptions | null | undefined
  ): string

  /**
   * Format a file extension.
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @this {void}
   *
   * @param {string | null | undefined} ext
   *  The file extension to format
   * @return {EmptyString | Ext}
   *  Formatted file extension or empty string
   */
  formatExt(this: void, ext: string | null | undefined): EmptyString | Ext

  /**
   * Check if `value` is a device root.
   *
   * @see {@linkcode DeviceRoot}
   *
   * @this {void}
   *
   * @param {unknown} value
   *  The value to check
   * @return {value is DeviceRoot}
   *  `true` if `value` is device root, `false` otherwise
   */
  isDeviceRoot(this: void, value: unknown): value is DeviceRoot

  /**
   * Check if `value` is a path segment separator.
   *
   * @see {@linkcode Sep}
   *
   * @this {void}
   *
   * @param {unknown} value
   *  The value to check
   * @return {value is Sep}
   *  `true` if `value` is path segment separator, `false` otherwise
   */
  isSep(this: void, value: unknown): value is Sep

  /**
   * Check if `value` is a {@linkcode URL} or can be parsed to a `URL`.
   *
   * @this {void}
   *
   * @param {unknown} value
   *  The value to check
   * @return {value is URL | string}
   *  `true` if `value` is a `URL` or can be parsed to a `URL`
   */
  isURL(this: void, value: unknown): value is URL | string

  /**
   * Convert a file `path` to a `file:` {@linkcode URL} string.
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
   * @see {@linkcode PathToFileUrlOptions}
   *
   * @this {void}
   *
   * @param {string} path
   *  The path to handle
   * @param {Omit<PathToFileUrlOptions, 'string'> & { string: true }} options
   *  Conversion options
   * @param {true} options.string
   *  Return `file:` URL string?
   * @return {string}
   *  `path` as `file:` URL string
   * @throws {ErrInvalidArgValue}
   */
  pathToFileURL(
    this: void,
    path: string,
    options: Omit<PathToFileUrlOptions, 'string'> & { string: true }
  ): string

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
   * @see {@linkcode PathToFileUrlOptions}
   *
   * @this {void}
   *
   * @param {string} path
   *  The path to handle
   * @param {PathToFileUrlOptions | null | undefined} [options]
   *  Conversion options
   * @return {URL}
   *  `path` as `file:` URL
   * @throws {ErrInvalidArgValue}
   */
  pathToFileURL(
    this: void,
    path: string,
    options?: PathToFileUrlOptions | null | undefined
  ): URL

  /**
   * Remove the file extension of `input`.
   *
   * Does nothing if `input` does not end with the provided file extension, or
   * if a file extension is not provided.
   *
   * @this {void}
   *
   * @param {string} input
   *  The path or URL string to handle
   * @param {string | null | undefined} ext
   *  The file extension to remove
   * @return {string}
   *  `input` unmodified or with `ext` removed
   */
  removeExt(this: void, input: string, ext: string | null | undefined): string

  /**
   * Remove the file extension of `url`.
   *
   * Does nothing if `url` does not end with the provided file extension, or
   * if a file extension is not provided.
   *
   * @this {void}
   *
   * @param {URL} url
   *  The {@linkcode URL} to handle
   * @param {string | null | undefined} ext
   *  The file extension to remove
   * @return {URL}
   *  `url` unmodified or with `ext` removed
   */
  removeExt(this: void, url: URL, ext: string | null | undefined): URL

  /**
   * Remove the file extension of `input`.
   *
   * Does nothing if `input` does not end with the provided file extension, or
   * if a file extension is not provided.
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @param {string | null | undefined} ext
   *  The file extension to remove
   * @return {URL | string}
   *  `input` unmodified or with `ext` removed
   */
  removeExt(
    this: void,
    input: URL | string,
    ext: string | null | undefined
  ): URL | string

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
   * @see {@linkcode ResolveWithOptions}
   *
   * @this {void}
   *
   * @param {ReadonlyArray<string> | string} paths
   *  Sequence of paths or path segments
   * @param {ResolveWithOptions | null | undefined} [options]
   *  Resolution options
   * @return {string}
   *  Absolute path
   */
  resolveWith(
    this: void,
    paths: string | readonly string[],
    options?: ResolveWithOptions | null | undefined
  ): string

  /**
   * Get the root of `input`.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @return {string}
   *  Root of `input`
   */
  root(this: void, input: URL | string): string

  /**
   * Convert `input` to a path.
   *
   * @see {@linkcode ToPathOptions}
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to convert
   * @param {ToPathOptions | null | undefined} [options]
   *  Conversion options
   * @return {string}
   *  `input` as path
   */
  toPath(
    this: void,
    input: URL | string,
    options?: ToPathOptions | null | undefined
  ): string

  /**
   * Convert a list of inputs to paths.
   *
   * @see {@linkcode ToPathOptions}
   *
   * @this {void}
   *
   * @param {ReadonlyArray<URL | string>} list
   *  The list of {@linkcode URL}s, URL strings, or paths to convert
   * @param {ToPathOptions | null | undefined} [options]
   *  Conversion options
   * @return {string[]}
   *  List of paths
   */
  toPath(
    this: void,
    list: readonly (URL | string)[],
    options?: ToPathOptions | null | undefined
  ): string[]

  /**
   * Convert inputs to paths.
   *
   * @see {@linkcode ToPathOptions}
   *
   * @this {void}
   *
   * @param {ReadonlyArray<URL | string> | URL | string} value
   *  The {@linkcode URL}, URL string, or path to convert,
   *  or list of such values
   * @param {ToPathOptions | null | undefined} [options]
   *  Conversion options
   * @return {string[] | string}
   *  `value` as path or new list of paths
   */
  toPath(
    this: void,
    value: readonly (URL | string)[] | URL | string,
    options?: ToPathOptions | null | undefined
  ): string[] | string

  /**
   * Make separators in `input` POSIX-compliant.
   *
   * Supports encoded separators (e.g. `%5C`, `%5c`).
   *
   * @template {URL | string} Input
   *  The URL or path to handle
   *
   * @this {void}
   *
   * @param {Input} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @return {Input}
   *  `input` with POSIX-compliant separators
   */
  toPosix<Input extends URL | string>(this: void, input: Input): Input

  /**
   * Make separators in `list` POSIX-compliant.
   *
   * Supports encoded separators (e.g. `%5C`, `%5c`).
   *
   * @template {(URL | string)[]} List
   *  The list to handle
   *
   * @this {void}
   *
   * @param {List} list
   *  The list of {@linkcode URL}s, URL strings, or paths to handle
   * @return {List}
   *  `list` with POSIX-compliant separators
   */
  toPosix<List extends (URL | string)[]>(this: void, list: List): List

  /**
   * Make separators in `value` POSIX-compliant.
   *
   * Supports encoded separators (e.g. `%5C`, `%5c`).
   *
   * @template {URL | string} Input
   *  The URL or path to handle
   *
   * @this {void}
   *
   * @param {Input | Input[]} value
   *  The {@linkcode URL}, URL string, or path to handle, or list of such values
   * @return {Input | Input[]}
   *  `value` with POSIX-compliant separators
   */
  toPosix<Input extends URL | string = URL | string>(
    this: void,
    value: Input | Input[]
  ): Input | Input[]
}

export type { Pathe as default }
