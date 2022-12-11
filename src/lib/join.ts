/**
 * @file join
 * @module pathe/lib/join
 */

import { DOT } from '#src/internal/constants'
import ensurePosix from '#src/internal/ensure-posix'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import normalize from './normalize'
import sep from './sep'

/**
 * Joins all given path segments together using a [path separator][1] as the
 * delimiter, then normalizes the resulting path.
 *
 * [1]: {@link ./sep.ts}
 *
 * @param {string[]} paths - A sequence of path segments
 * @return {string} Path segment sequence, `paths`, as one path
 * @throws {TypeError} If any segment in `paths` is not a string
 */
const join = (...paths: string[]): string => {
  // exit early if no segments to join
  if (paths.length === 0) return DOT

  /**
   * Path segment sequence, {@linkcode paths}, as one path.
   *
   * @var {string} joined
   */
  let joined: string = ''

  /**
   * First path segment.
   *
   * @var {string} segment
   */
  let segment: string = ''

  // join path segments
  for (let path of paths) {
    validateString(path, 'path')

    if (path.length === 0) continue
    path = ensurePosix(path)

    if (!segment) segment = path
    joined += `${joined ? sep : ''}${ensurePosix(path)}`
  }

  // exit early if joined path is empty string
  if (!joined) return DOT

  /**
   * Path separator deduplication check.
   *
   * This check ensures that {@linkcode joined} does not start with two path
   * separator characters ([`sep`][1]). If it does, {@linkcode normalize} will
   * mistake it for a UNC path.
   *
   * This check is skipped when it is clear that the user intended to point at a
   * UNC path. This is assumed when the first non-empty string argument starts
   * with exactly two separator characters, followed by at least one more
   * non-separator characters.
   *
   * **Note**: In order for {@linkcode normalize} to recognize a UNC path, the
   * path must have at least 2 components, so that is not accounted for below.
   * This means that the user can use {@linkcode join} to construct UNC paths
   * from a server name and a share name:
   *
   * [1]: {@link ./sep.ts}
   *
   * @example
   *  pathe.join('//server', 'share') // '//server/share/'
   *
   * @var {boolean} dedupe
   */
  let dedupe: boolean = true

  /**
   * Path separator count.
   *
   * @var {number} s
   */
  let s: number = 0

  // try matching unc patch component if at first segment is possible root
  if (isSep(segment.charAt(0))) {
    ++s

    // another separator => continue unc path component check
    if (segment.length > 1 && isSep(segment.charAt(1))) {
      ++s

      // unc path component should contain more than just separators
      if (segment.length > 2) {
        if (isSep(segment.charAt(2))) ++s
        // matched unc path component in first segment
        else dedupe = false
      }
    }
  }

  // deduplicate separators
  if (dedupe) {
    // find any more separators that need to be replaced
    while (s < joined.length && isSep(joined.charAt(s))) s++

    // replace separators
    if (s >= 2) joined = `${sep}${joined.slice(s)}`
  }

  return normalize(joined)
}

export default join
