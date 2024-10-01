/**
 * @file relative
 * @module pathe/lib/relative
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import validateString from '#internal/validate-string'
import dot from '#lib/dot'
import isSep from '#lib/is-sep'
import resolveWith from '#lib/resolve-with'
import sep from '#lib/sep'
import type { Cwd } from '@flex-development/pathe'

export default relative

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
 * @category
 *  core
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
function relative(
  from: string,
  to: string,
  cwd?: Cwd | null | undefined,
  env?: Partial<Record<string, string>> | null | undefined
): string {
  validateString(from, 'from')
  validateString(to, 'to')

  if (from === to) return ''

  from = resolveWith(from, cwd, env)
  to = resolveWith(to, cwd, env)

  if (from.toLowerCase() === to.toLowerCase()) return ''

  const [fromLen, fromStart, fromEnd] = measure(from)
  const [toLen, toStart, toEnd] = measure(to)

  /**
   * Length of shortest path.
   *
   * @const {number} length
   */
  const length: number = fromLen < toLen ? fromLen : toLen

  /**
   * Index of last common separator.
   *
   * @var {number} lastCommonSep
   */
  let lastCommonSep: number = -1

  /**
   * End index of longest common path from root.
   *
   * @var {number} i
   */
  let i: number = 0

  // compare paths to find the longest common path from root
  for (; i < length; i++) {
    /**
     * Current character code in {@linkcode from}.
     *
     * @const {string} char
     */
    const char: string = from.at(fromStart + i)!

    if (char.toLowerCase() !== to.at(toStart + i)!.toLowerCase()) break
    else if (isSep(char)) lastCommonSep = i
  }

  if (i === length) {
    if (toLen > length) {
      // `from` is the exact base path for `to`
      if (isSep(to.at(toStart + i))) return to.slice(toStart + i + 1)

      // `from` is the root
      if (i === 0 && isSep(from)) return to.slice(toStart + i)
    }

    if (fromLen > length) {
      // `to` is the exact base path for `from`
      if (isSep(from.at(fromStart + i))) lastCommonSep = i
      // `to` is the root
      else if (i === 0 && isSep(to)) lastCommonSep = i
    }
  } else {
    // mismatch before first common path separator was seen
    if (lastCommonSep === -1) {
      if (DRIVE_PATH_REGEX.test(from) || DRIVE_PATH_REGEX.test(to)) return to
    }
  }

  /**
   * Relative path.
   *
   * @var {string} out
   */
  let out: string = ''

  // generate relative path based on path difference between `to` and `from`
  for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
    if (i === fromEnd || isSep(from[i])) {
      out += `${out.length === 0 ? '' : sep}${dot.repeat(2)}`
    }
  }

  // append rest of destination (`to`) path that comes after common path parts
  return `${out}${to.slice(toStart + lastCommonSep, toEnd)}`
}

/**
 * Measure `path`.
 *
 * @internal
 *
 * @param {string} path
 *  Path to measure
 * @return {[number, number, number]}
 *  List containing distance between offsets of `path`, start offset of `path`,
 *  and end offset of `path`
 */
function measure(path: string): [number, number, number] {
  /**
   * Start offset of {@linkcode path}.
   *
   * @var {number} start
   */
  let start: number = 0

  /**
   * End offset of {@linkcode path}.
   *
   * @var {number} end
   */
  let end: number = path.length

  // remove leading separators
  while (start < path.length && isSep(path.at(start))) start++

  // remove trailing separators
  while (end - 1 > start && isSep(path.at(end - 1))) end--

  return [end - start, start, end]
}
