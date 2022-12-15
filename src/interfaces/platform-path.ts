/**
 * @file Interfaces - PlatformPath
 * @module pathe/interfaces/PlatformPath
 */

import type { FormatInputPathObject, ParsedPath } from '#src/interfaces'
import type { Delimiter, Ext, Sep } from '#src/types'
import type { EmptyString } from '@flex-development/tutils'

/**
 * Utilities for working with file and directory paths.
 */
interface PlatformPath {
  /**
   * Path delimiter.
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
   * Also known as a "directory separator".
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
   * Returns the last portion of a `path`, similar to the Unix `basename`
   * command.
   *
   * Trailing [directory separators][1] are ignored.
   *
   * [1]: https://nodejs.org/api/path.html#pathsep
   *
   * @param {string} path - Path to evaluate
   * @param {string} [suffix] - Suffix to remove from result
   * @return {string} Last portion of `path`
   * @throws {TypeError} If `path` is not a string or `suffix` is not a string
   */
  basename(path: string, suffix?: string): string

  /**
   * Returns the directory name of a `path`, similar to the Unix `dirname`
   * command.
   *
   * Trailing [directory separators][1] are ignored.
   *
   * [1]: https://nodejs.org/api/path.html#pathsep
   *
   * @param {string} path - Path to evaluate
   * @return {string} Directory name of `path`
   * @throws {TypeError} If `path` is not a string
   */
  dirname(path: string): string

  /**
   * Returns the extension of a `path`, from the last occurrence of the `.`
   * (dot) character to end of the string in the last portion of the path.
   *
   * If there is no `.` in the last portion of `path`, or if there are no  `.`
   * characters other than the first character of the path's [`basename`][1], an
   * empty string will be returned.
   *
   * [1]: {@link ../lib/basename.ts}
   *
   * @param {string} path - Path to evaluate
   * @return {EmptyString | Ext} Extension of `path` or empty string
   * @throws {TypeError} If `path` is not a string
   */
  extname(path: string): EmptyString | Ext

  /**
   * Returns a path string from an object &mdash; the opposite of
   * [`parse()`][1].
   *
   * When adding properties to `pathObject`, there are combinations where one
   * property has priority over another:
   *
   * - `pathObject.root` is ignored if `pathObject.dir` is provided
   * - `pathObject.ext` is ignored if `pathObject.base` exists
   * - `pathObject.name` is ignored if `pathObject.base` exists
   *
   * [1]: {@link ../lib/parse.ts}
   *
   * @param {FormatInputPathObject} pathObject - Object to evaluate
   * @param {string} [pathObject.base] - File name including extension (if any)
   * @param {string} [pathObject.dir] - Directory name or full directory path
   * @param {string} [pathObject.ext] - File extension (if any)
   * @param {string} [pathObject.name] - File name without extension (if any)
   * @param {string} [pathObject.root] - Root of path
   * @return {string} Path string
   * @throws {TypeError} If `pathObject` is not an object
   */
  format(pathObject: FormatInputPathObject): string

  /**
   * Determines if `path` is an absolute path.
   *
   * If the given `path` is a zero-length string, `false` will be returned.
   *
   * @param {string} path - Path to evaluate
   * @return {boolean} `true` if `path` is absolute, `false` otherwise
   * @throws {TypeError} If `path` is not a string
   */
  isAbsolute(path: string): boolean

  /**
   * Joins all given `path` segments together using a [path separator][1] as the
   * delimiter, then normalizes the resulting path.
   *
   * Zero-length `path` segments are ignored. If the joined path string is a
   * zero-length string then `'.'` will be returned, representing the current
   * working directory.
   *
   * [1]: {@link ../lib/sep.ts}
   *
   * @param {string[]} paths - Path segment sequence
   * @return {string} Path segment sequence, `paths`, as one path
   * @throws {TypeError} If any segment in `paths` is not a string
   */
  join(...paths: string[]): string

  /**
   * Normalizes the given `path`, resolving `'..'` and `'.'` segments.
   *
   * When multiple, sequential path segment separation characters are found
   * (e.g. `/` on POSIX and either `\\` or `/` on Windows), they are replaced by
   * a single instance of a POSIX-compliant separator. Trailing separators are
   * preserved.
   *
   * If the `path` is a zero-length string, `'.'` is returned, representing the
   * current working directory.
   *
   * @param {string} path - Path to normalize
   * @return {string} Normalized `path`
   * @throws {TypeError} If `path` is not a string
   */
  normalize(path: string): string

  /**
   * Returns an object whose properties represent significant elements of the
   * given `path`. Trailing directory [separators][1] are ignored.
   *
   * **Note**: Unlike Node.js, `pathe.parse(path).dir === pathe.dirname(path)`
   * when `path` is a non-empty string. See [`nodejs/node#18655`][3] for
   * details.
   *
   * [1]: {@link ../lib/sep.ts}
   * [2]: {@link ../lib/dirname.ts}
   * [3]: https://github.com/nodejs/node/issues/18655
   *
   * @param {string} path - Path to evaluate
   * @return {ParsedPath} Object representing significant elements of `path`
   * @throws {TypeError} If `path` is not a string
   */
  parse(path: string): ParsedPath

  /**
   * Returns the relative path from `from` to `to` based on the current working
   * directory.
   *
   * If `from` and `to` resolve to the same path (after calling [`resolve`][1]
   * on each), a zero-length string will be returned.
   *
   * If a zero-length string is passed as `from` or `to`, the current working
   * directory will be used instead of the zero-length strings.
   *
   * [1]: {@link ../lib/resolve.ts}
   *
   * @param {string} from - Start path
   * @param {string} to - Destination path
   * @return {string} Relative path from `from` to `to`
   * @throws {TypeError} If either `from` or `to` is not a string
   */
  relative(from: string, to: string): string

  /**
   * Resolves a sequence of paths or path segments into an absolute path.
   *
   * The given sequence of paths is processed from right to left, with each
   * subsequent `path` prepended until an absolute path is constructed.
   *
   * For instance, given the sequence of path segments: `/foo`, `/bar`, `baz`,
   * calling `pathe.resolve('/foo', '/bar', 'baz')` would return `/bar/baz`
   * because `'baz'` is not an absolute path but `'/bar' + '/' + 'baz'` is.
   *
   * If, after processing all given `path` segments, an absolute path has not
   * yet been generated, the current working directory is used.
   *
   * The resulting path is normalized and trailing [separators][1] are removed
   * unless the path is resolved to the root directory.
   *
   * Zero-length `path` segments are ignored.
   *
   * If no `path` segments are passed, the absolute path of the current working
   * directory will be returned.
   *
   * [1]: {@link ../lib/sep.ts}
   *
   * @param {string[]} paths - Path segment sequence
   * @return {string} Path segment sequence, `paths`, as absolute path
   * @throws {TypeError} If any segment in `paths` is not a string
   */
  resolve(...paths: string[]): string

  /**
   * Returns an equivalent [namespace-prefixed path][1] for the given `path`.
   *
   * If `path` is not a [drive path][2] or [UNC path][3], `path` will be
   * returned without modifications.
   *
   * [1]: https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#namespaces
   * [2]: https://learn.microsoft.com/windows/win32/fileio/naming-a-file#naming-conventions
   * [3]: https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
   *
   * @param {string} path - Path to evaluate
   * @return {string} `path` without modification or as namespace-prefixed path
   */
  toNamespacedPath(path: string): string
}

export type { PlatformPath as default }
