/**
 * @file join
 * @module pathe/lib/join
 */

import ensurePosix from '#src/internal/ensure-posix'
import isSep from '#src/internal/is-sep'
import validateString from '#src/internal/validate-string'
import { DOT, at, ifelse, isEmptyString } from '@flex-development/tutils'
import normalize from './normalize'
import sep from './sep'

/**
 * Joins all given `path` segments together using a [path separator][1] as the
 * delimiter, then normalizes the resulting path.
 *
 * Zero-length `path` segments are ignored. If the joined path string is a
 * zero-length string then `'.'` will be returned, representing the current
 * working directory.
 *
 * [1]: {@link ./sep.ts}
 *
 * @param {string[]} paths - Path segment sequence
 * @return {string} Path segment sequence, `paths`, as one path
 * @throws {TypeError} If any segment in `paths` is not a string
 */
const join = (...paths: string[]): string => {
  // exit early if no segments to join
  if (!paths.length) return DOT

  /**
   * Path segment sequence, {@linkcode paths}, as one path.
   *
   * @var {string} joined
   */
  let joined: string = ''

  /**
   * First path segment in {@linkcode paths}.
   *
   * @var {string} first_segment
   */
  let first_segment: string = ''

  // join path segments
  for (let path of paths) {
    validateString(path, 'path')

    // skip empty path segments
    if (isEmptyString(path)) continue

    // ensure path segment meets posix standards
    path = ensurePosix(path)

    // capture first path segment to determine if separators should be deduped
    if (!first_segment) first_segment = path

    // add current path segment to joined path
    joined += `${ifelse(joined, sep, '')}${path}`
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
   * non-separator character.
   *
   * **Note**: In order for {@linkcode normalize} to recognize a UNC path, the
   * path must have at least 2 components, so this check does not take that into
   * account. This means that the user can use {@linkcode join} to construct UNC
   * paths from a server name and a share name:
   *
   * [1]: {@link ./sep.ts}
   *
   * @example
   *  pathe.join('//server', 'share') // '//server/share/'
   * @example
   *  pathe.join('\\\\server', 'share') // '//server/share/'
   *
   * @var {boolean} dedupe
   */
  let dedupe: boolean = true

  /**
   * Path separator count.
   *
   * @var {number} separators
   */
  let separators: number = 0

  // try matching unc patch component if first segment is possible root
  if (isSep(at(first_segment, 0))) {
    ++separators

    // another separator => continue unc root check
    if (first_segment.length > 1 && isSep(at(first_segment, 1))) {
      ++separators

      // unc path component should contain more than just separators
      if (first_segment.length > 2) {
        if (isSep(at(first_segment, 2))) ++separators
        // matched unc path component in first segment
        else dedupe = false
      }
    }
  }

  // deduplicate separators
  if (dedupe) {
    // find any more separators that need to be replaced
    while (separators < joined.length && isSep(at(joined, separators))) {
      separators++
    }

    // replace separators
    if (separators >= 2) joined = `${sep}${joined.slice(separators)}`
  }

  return normalize(joined)
}

export default join
