/**
 * @file Library - relative
 * @module pathe/lib/relative
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import resolve from './resolve'
import sep from './sep'

/**
 * Returns the relative path from `from` to `to` based on the current working
 * directory.
 *
 * If `from` and `to` resolve to the same path (after calling [`resolve`][1] on
 * each), a zero-length string will be returned.
 *
 * If a zero-length string is passed as `from` or `to`, the current working
 * directory will be used instead of the zero-length strings.
 *
 * [1]: {@link ./resolve.ts}
 *
 * @param {string} from - Start path
 * @param {string} to - Destination path
 * @return {string} Relative path from `from` to `to`
 * @throws {TypeError} If either `from` or `to` is not a string
 */
const relative = (from: string, to: string): string => {
  validateString(from, 'from')
  validateString(to, 'to')

  // exit early if from and to are the same path
  if (from === to) return ''

  // ensure paths meet posix standards + resolve paths
  from = resolve((from = ensurePosix(from)))
  to = resolve((to = ensurePosix(to)))

  // exit early if from and to are the same resolved path
  if (from.toLowerCase() === to.toLowerCase()) return ''

  /**
   * Measures the given `path`.
   *
   * The path will have leading and trailing separators removed. The function
   * will return the length, start index, and end index of the trimmed path.
   *
   * @param {string} path - Path to measure
   * @return {[number, number, number]} Length and indices of trimmed path
   */
  const measure = (path: string): [number, number, number] => {
    /**
     * Start index of trimmed path.
     *
     * @var {number} start
     */
    let start: number = 0

    /**
     * End index of trimmed path.
     *
     * @var {number} end
     */
    let end: number = path.length

    // remove leading separators
    while (start < path.length && isSep(path.charAt(start))) start++

    // remove trailing separators
    while (end - 1 > start && isSep(path.charAt(end - 1))) end--

    return [end - start, start, end]
  }

  // measure paths
  const [from_length, from_start, from_end] = measure(from)
  const [to_length, to_start, to_end] = measure(to)

  /**
   * Length of longest common path from root.
   *
   * @const {number} length
   */
  const length: number = from_length < to_length ? from_length : to_length

  /**
   * Index of last common separator.
   *
   * @var {number} sepidx
   */
  let sepidx: number = -1

  /**
   * Current index.
   *
   * @var {number} i
   */
  let i: number = 0

  // get index of last common separator
  for (; i < length; i++) {
    /**
     * Character at {@linkcode from_start} + {@linkcode i} in {@linkcode from}.
     *
     * @const {string} char
     */
    const char: string = from.charAt(from_start + i).toLowerCase()

    if (char !== to.charAt(to_start + i).toLowerCase()) break
    else if (isSep(char)) sepidx = i
  }

  if (i === length) {
    // from is an exact base path, device root, or posix root
    if (to_length > length) {
      // from is an exact base path
      if (isSep(to.charAt(to_start + i))) return to.slice(to_start + i + 1)

      // from is a device root or posix root
      if (i === 0 || i === 2) return to.slice(to_start + i)
    }

    // to is an exact base path, device root, or posix root
    if (from_length > length) {
      // to is an exact base path
      if (isSep(from.charAt(from_start + i))) sepidx = i
      // to is a device root
      /* c8 ignore next */ else if (i === 2) sepidx = 3
      // to is posix root
      else if (i === 0) sepidx = 0
    }
  } else {
    // mismatch before first common path separator was seen
    if (sepidx === -1 && !(from.startsWith(sep) && to.startsWith(sep))) {
      return to
    }
  }

  /**
   * Index of relative path between {@linkcode from} and {@linkcode to}.
   *
   * @const {number} offset
   */
  const offset: number = to_start + sepidx

  /**
   * Relative path between {@linkcode from} and {@linkcode to}.
   *
   * @var {string} rel
   */
  let rel: string = ''

  // generate relative path based on path difference between to and from
  for (i = from_start + sepidx + 1; i <= from_end; ++i) {
    if (i === from_end || isSep(from.charAt(i))) {
      rel += `${rel.length === 0 ? '' : sep}${DOT.repeat(2)}`
    }
  }

  // append rest of destination path that comes after common path components
  return rel + to.slice(offset, to_end)
}

export default relative
