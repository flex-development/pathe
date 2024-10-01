/**
 * @file matchesGlob
 * @module pathe/lib/matchesGlob
 */

import process from '#internal/process'
import validateString from '#internal/validate-string'
import toPosix from '#lib/to-posix'
import micromatch from 'micromatch'

/**
 * Check if `path` matches `pattern`.
 *
 * @see {@linkcode micromatch.Options}
 * @see {@linkcode micromatch.isMatch}
 *
 * @category
 *  core
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
function matchesGlob(
  path: string,
  pattern: string | string[],
  options?: micromatch.Options | null | undefined
): boolean {
  validateString(path, 'path')

  if (Array.isArray<string>(pattern)) {
    /**
     * Current index in {@linkcode pattern}.
     *
     * @var {number} i
     */
    let i: number = -1

    while (++i < pattern.length) {
      /**
       * Current pattern.
       *
       * @const {string} pat
       */
      const pat: string = pattern[i]!

      validateString(pat, `pattern[${i}]`)
      pattern[i] = toPosix(pat)
    }
  } else {
    validateString(pattern, 'pattern')
    pattern = toPosix(pattern)
  }

  return micromatch.isMatch(toPosix(path), pattern, {
    ...options,
    cwd: options?.cwd ?? process.cwd()
  })
}

export default matchesGlob
