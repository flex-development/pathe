/**
 * @file join
 * @module pathe/lib/join
 */

import validateString from '#internal/validate-string'
import dot from './dot'
import isSep from './is-sep'
import normalize from './normalize'
import sep from './sep'

/**
 * Join all path segments in `paths` using {@linkcode sep} as the delimiter and
 * normalize the result.
 *
 * Zero-length path segments are ignored.
 * If the joined path string is a zero-length string, {@linkcode dot} is
 * returned, representing the current working directory.
 *
 * @category
 *  core
 *
 * @param {string[]} paths
 *  Path segment sequence
 * @return {string}
 *  Path segment sequence as one path
 */
function join(...paths: string[]): string {
  if (!paths.length) return dot

  /**
   * First path segment in {@linkcode paths}.
   *
   * @var {string} firstSegment
   */
  let firstSegment: string = ''

  /**
   * Joined path string.
   *
   * @var {string} joined
   */
  let joined: string = ''

  for (const path of paths) {
    validateString(path, 'path')

    if (path.length) {
      if (!firstSegment) firstSegment = path
      joined += `${joined ? sep : ''}${path}`
    }
  }

  if (!joined) return dot

  /**
   * Path separator deduplication check.
   *
   * This check ensures {@linkcode joined} does not start with two path
   * separator characters. If it does, {@linkcode normalize} will mistake it for
   * a UNC path.
   *
   * This check is skipped when it is clear that the user intended to point at a
   * UNC path. This is assumed when the first non-empty string argument starts
   * with exactly two separator characters, followed by at least one more
   * non-separator character.
   *
   * > 👉 **Note**: In order for {@linkcode normalize} to recognize a UNC path,
   * > the path must have at least 2 components, so this check does not take
   * > that into account. This means that the user can use {@linkcode join} to
   * > construct UNC paths from a server name and a share name.
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

  if (isSep(firstSegment[0])) {
    ++separators

    if (firstSegment.length > 1 && isSep(firstSegment[1])) {
      ++separators

      if (firstSegment.length > 2) {
        if (isSep(firstSegment[2])) ++separators
        // matched unc path component in first segment
        else dedupe = false
      }
    }
  }

  if (dedupe) {
    // find any more consecutive slashes that need to be replaced
    while (separators < joined.length && isSep(joined[separators])) separators++
    // replace separators
    if (separators >= 2) joined = `${sep}${joined.slice(separators)}`
  }

  return normalize(joined)
}

export default join
