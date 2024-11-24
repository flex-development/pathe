/**
 * @file Interfaces - PlatformPath
 * @module pathe/interfaces/PlatformPath
 */

import type dot from '#lib/dot'
import type resolveWith from '#lib/resolve-with'
import type toPath from '#lib/to-path'
import type {
  Delimiter,
  EmptyString,
  Ext,
  FormatInputPathObject,
  ParsedPath,
  RelativeOptions,
  ResolveWithOptions,
  Sep
} from '@flex-development/pathe'
import type micromatch from 'micromatch'

/**
 * Utilities for working with file and directory paths.
 */
interface PlatformPath {
  /**
   * Path delimiter.
   *
   * @see {@linkcode Delimiter}
   *
   * @readonly
   */
  readonly delimiter: Delimiter

  /**
   * Posix specific pathing.
   *
   * @readonly
   */
  readonly posix: PlatformPath

  /**
   * Path segment separator.
   *
   * @see {@linkcode Sep}
   *
   * @readonly
   */
  readonly sep: Sep

  /**
   * Windows specific pathing.
   *
   * @readonly
   */
  readonly win32: PlatformPath

  /**
   * Get the last portion of `input`, similar to the Unix `basename` command.
   *
   * Trailing [directory separators][sep] are ignored.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * [sep]: https://nodejs.org/api/path.html#pathsep
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @param {string | null | undefined} [suffix]
   *  The suffix to remove
   * @return {string}
   *  Last portion of `input` or empty string
   */
  basename(
    this: void,
    input: URL | string,
    suffix?: string | null | undefined
  ): string

  /**
   * Get the directory name of `input`, similar to the Unix `dirname` command.
   *
   * Trailing [directory separators][sep] are ignored.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * [sep]: https://nodejs.org/api/path.html#pathsep
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @return {string}
   *  Directory name of `input`
   */
  dirname(this: void, input: URL | string): string

  /**
   * Get the file extension of `input` from the last occurrence of the `.` (dot)
   * character (`.`) to end of the string in the last portion of `input`.
   *
   * If there is no `.` in the last portion of `input`, or if there are no `.`
   * characters other than the first character of the {@linkcode basename} of
   * `input`, an empty string is returned.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to handle
   * @return {EmptyString | Ext}
   *  Extension of `input` or empty string
   */
  extname(this: void, input: URL | string): EmptyString | Ext

  /**
   * Get a path string from an object.
   *
   * This is the opposite of {@linkcode parse}.
   *
   * When adding properties to `pathObject`, there are combinations where one
   * property has priority over another:
   *
   * - `pathObject.root` is ignored if `pathObject.dir` is provided
   * - `pathObject.ext` and `pathObject.name` are ignored if `pathObject.base`
   *   exists
   *
   * @see {@linkcode FormatInputPathObject}
   *
   * @this {void}
   *
   * @param {FormatInputPathObject | null | undefined} pathObject
   *  The path object to handle
   * @param {string | null | undefined} [pathObject.base]
   *  File name including extension (if any)
   * @param {string | null | undefined} [pathObject.dir]
   *  Directory name or full directory path
   * @param {string | null | undefined} [pathObject.ext]
   *  File extension (if any)
   * @param {string | null | undefined} [pathObject.name]
   *  File name without extension (if any)
   * @param {string | null | undefined} [pathObject.root]
   *  Root of path
   * @return {string}
   *  Path string
   */
  format(
    this: void,
    pathObject: FormatInputPathObject | null | undefined
  ): string

  /**
   * Determine if `input` is absolute.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to check
   * @return {boolean}
   *  `true` if `input` is absolute, `false` otherwise
   */
  isAbsolute(this: void, input: URL | string): boolean

  /**
   * Join all path segments in `paths` using {@linkcode sep} as the delimiter
   * and normalize the result.
   *
   * Zero-length path segments are ignored.
   * If the joined path string is a zero-length string, {@linkcode dot} is
   * returned, representing the current working directory.
   *
   * @this {void}
   *
   * @param {string[]} paths
   *  The path segment sequence
   * @return {string}
   *  Path segment sequence as one path
   */
  join(this: void, ...paths: string[]): string

  /**
   * Check if `input` matches `pattern`.
   *
   * @see {@linkcode micromatch.Options}
   * @see {@linkcode micromatch.isMatch}
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to glob-match against
   * @param {string | string[]} pattern
   *  Glob patterns to use for matching
   * @param {micromatch.Options | null | undefined} [options]
   *  Options for matching
   * @return {boolean}
   *  `true` if `input` matches `pattern`, `false` otherwise
   */
  matchesGlob(
    this: void,
    input: URL | string,
    pattern: string | string[],
    options?: micromatch.Options | null | undefined
  ): boolean

  /**
   * Normalize `path`, resolving `'..'` and `'.'` segments.
   *
   * When multiple, sequential path segment separators are found, they are
   * replaced by a single instance of {@linkcode sep}. Trailing separators are
   * preserved.
   *
   * If `path` is a zero-length string, {@linkcode dot} is returned,
   * representing the current working directory.
   *
   * @this {void}
   *
   * @param {string} path
   *  The path to normalize
   * @return {string}
   *  Normalized `path`
   */
  normalize(this: void, path: string): string

  /**
   * Create an object whose properties represent significant elements of
   * `input`. Trailing directory separators are ignored.
   *
   * > 👉 **Note**: If `input` is a {@linkcode URL}, or can be parsed to a
   * > `URL`, it will be converted to a path using {@linkcode toPath}.
   *
   * @see {@linkcode ParsedPath}
   *
   * @this {void}
   *
   * @param {URL | string} input
   *  The {@linkcode URL}, URL string, or path to parse
   * @return {ParsedPath}
   *  Significant elements of `path`
   */
  parse(this: void, input: URL | string): ParsedPath

  /**
   * Get the relative path from `from` to `to` based on the current working
   * directory.
   *
   * If `from` and `to` resolve to the same path (after calling
   * {@linkcode resolveWith} on each), a zero-length string is returned.
   *
   * If a zero-length string is passed as `from` or `to`, the current working
   * directory will be used instead of the zero-length strings.
   *
   * > 👉 **Note**: If `from` or `to` is a {@linkcode URL}, or can be parsed to
   * > a `URL`, they'll be converted to paths using {@linkcode toPath}.
   *
   * @see {@linkcode RelativeOptions}
   *
   * @category
   *  core
   *
   * @this {void}
   *
   * @param {URL | string[] | string} from
   *  Start path, path segments, or URL
   * @param {URL | string[] | string} to
   *  Destination path, path segments, or URL
   * @param {RelativeOptions | null | undefined} [options]
   *  Relative path generation options
   * @return {string}
   *  Relative path from `from` to `to`
   */
  relative(
    this: void,
    from: URL | string[] | string,
    to: URL | string[] | string,
    options?: RelativeOptions | null | undefined
  ): string

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
   * @this {void}
   *
   * @param {string[]} paths
   *  Sequence of paths or path segments
   * @return {string}
   *  Absolute path
   */
  resolve(this: void, ...paths: string[]): string

  /**
   * Get an equivalent [namespace-prefixed path][namespace] for `path`.
   *
   * > 👉 **Note**: If `path` is not a [drive][drive] or [UNC][unc] path, it
   * > will be returned without modifications.
   *
   * [drive]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
   * [namespace]: https://docs.microsoft.com/windows/desktop/FileIO/naming-a-file#namespaces
   * [unc]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
   *
   * @see {@linkcode ResolveWithOptions}
   *
   * @this {void}
   *
   * @param {string} path
   *  The path to handle
   * @param {ResolveWithOptions | null | undefined} [options]
   *  Resolution options
   * @return {string}
   *  Namespace-prefixed path or `path` without modifications
   */
  toNamespacedPath(
    this: void,
    path: string,
    options?: ResolveWithOptions | null | undefined
  ): string
}

export type { PlatformPath as default }
