/**
 * @file Interfaces - PlatformPath
 * @module pathe/interfaces/PlatformPath
 */

import type dot from '#lib/dot'
import type resolveWith from '#lib/resolve-with'
import type {
  Cwd,
  Delimiter,
  EmptyString,
  Ext,
  FormatInputPathObject,
  ParsedPath,
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
   * Get the last portion of `path`, similar to the Unix `basename` command.
   *
   * Trailing [directory separators][sep] are ignored.
   *
   * [sep]: https://nodejs.org/api/path.html#pathsep
   *
   * @param {string} path
   *  The path to handle
   * @param {string | null | undefined} [suffix]
   *  Suffix to remove
   * @return {string}
   *  Last portion of `path` or empty string
   */
  basename(this: void, path: string, suffix?: string | null | undefined): string

  /**
   * Get the directory name of `path`, similar to the Unix `dirname` command.
   *
   * Trailing [directory separators][sep] are ignored.
   *
   * [sep]: https://nodejs.org/api/path.html#pathsep
   *
   * @param {string} path
   *  The path to handle
   * @return {string}
   *  Directory name of `path`
   */
  dirname(this: void, path: string): string

  /**
   * Get the file extension of `path` from the last occurrence of the `.` (dot)
   * character (`.`) to end of the string in the last portion of `path`.
   *
   * If there is no `.` in the last portion of `path`, or if there are no `.`
   * characters other than the first character of the {@linkcode basename} of
   * `path`, an empty string is returned.
   *
   * @see {@linkcode EmptyString}
   * @see {@linkcode Ext}
   *
   * @param {string} path
   *  The path to handle
   * @return {EmptyString | Ext}
   *  Extension of `path` or empty string
   */
  extname(this: void, path: string): EmptyString | Ext

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
   * @param {FormatInputPathObject | null | undefined} pathObject
   *  Path object to handle
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
   * Determine if `path` is absolute.
   *
   * @param {string} path
   *  Path to check
   * @return {boolean}
   *  `true` if `path` is absolute, `false` otherwise
   */
  isAbsolute(this: void, path: string): boolean

  /**
   * Join all path segments in `paths` using {@linkcode sep} as the delimiter
   * and normalize the result.
   *
   * Zero-length path segments are ignored.
   * If the joined path string is a zero-length string, {@linkcode dot} is
   * returned, representing the current working directory.
   *
   * @param {string[]} paths
   *  Path segment sequence
   * @return {string}
   *  Path segment sequence as one path
   */
  join(this: void, ...paths: string[]): string

  /**
   * Check if `path` matches `pattern`.
   *
   * @see {@linkcode micromatch.Options}
   * @see {@linkcode micromatch.isMatch}
   *
   * @param {string} path
   *  The path to glob-match against
   * @param {string | string[]} pattern
   *  Glob patterns to use for matching
   * @param {micromatch.Options | null | undefined} [options]
   *  Options for matching
   * @return {boolean}
   *  `true` if `path` matches `pattern`, `false` otherwise
   */
  matchesGlob(
    path: string,
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
   * @param {string} path
   *  Path to normalize
   * @return {string}
   *  Normalized `path`
   */
  normalize(this: void, path: string): string

  /**
   * Create an object whose properties represent significant elements of `path`.
   * Trailing directory separators are ignored.
   *
   * > 👉 **Note**: Like Node.js, when `path` does not have a base (i.e.
   * > `'file.mjs'`), `parsedPath.dir` is **not** equivalent to `dirname(path)`.
   * > See [`nodejs/node#18655`][18655] for details.
   *
   * [18655]: https://github.com/nodejs/node#18655
   *
   * @see {@linkcode ParsedPath}
   *
   * @param {string} path
   *  The path to handle
   * @return {ParsedPath}
   *  Significant elements of `path`
   */
  parse(this: void, path: string): ParsedPath

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
   * @see {@linkcode Cwd}
   *
   * @param {string} from
   *  Start path
   * @param {string} to
   *  Destination path
   * @param {Cwd | null | undefined} [cwd]
   *  Get the path to the current working directory
   * @param {Partial<Record<string, string>> | null | undefined} [env]
   *  Environment variables
   * @return {string}
   *  Relative path from `from` to `to`
   */
  relative(
    this: void,
    from: string,
    to: string,
    cwd?: Cwd | null | undefined,
    env?: Partial<Record<string, string>> | null | undefined
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
   * @param {string[]} paths
   *  Sequence of paths or path segments
   * @return {string}
   *  Absolute path
   */
  resolve(this: void, ...paths: string[]): string

  /**
   * Get an equivalent [namespace-prefixed path][namespace] for `path`.
   *
   * > 👉 If `path` is not a [drive][drive] or [UNC][unc] path, it will be
   * > returned without modifications.
   *
   * [drive]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
   * [namespace]: https://docs.microsoft.com/windows/desktop/FileIO/naming-a-file#namespaces
   * [unc]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
   *
   * @param {string} path
   *  The path to handle
   * @return {string}
   *  Namespace-prefixed path or `path` without modifications
   */
  toNamespacedPath(this: void, path: string): string
}

export type { PlatformPath as default }
