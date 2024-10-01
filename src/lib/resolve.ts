/**
 * @file resolve
 * @module pathe/lib/resolve
 */

import process from '#internal/process'
import resolveWith from '#lib/resolve-with'

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
 * If, after processing all given `path` segments, an absolute path has not yet
 * been generated, the current working directory is used.
 *
 * The resulting path is normalized and trailing separators are removed unless
 * the path is resolved to the root directory.
 *
 * Zero-length `path` segments are ignored.
 *
 * If no `path` segments are passed, the absolute path of the current working
 * directory is returned.
 *
 * @category
 *  core
 *
 * @param {string[]} paths
 *  Sequence of paths or path segments
 * @return {string}
 *  Absolute path
 */
function resolve(...paths: string[]): string {
  return resolveWith(paths, process.cwd, process.env)
}

export default resolve
