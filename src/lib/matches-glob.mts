/**
 * @file matchesGlob
 * @module pathe/lib/matchesGlob
 */

import process from '#internal/process'
import validateString from '#internal/validate-string'
import validateURLString from '#internal/validate-url-string'
import toPosix from '#lib/to-posix'
import micromatch from 'micromatch'

/**
 * Check if `input` matches `pattern`.
 *
 * @see {@linkcode micromatch.Options}
 * @see {@linkcode micromatch.isMatch}
 *
 * @category
 *  core
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
function matchesGlob(
  this: void,
  input: URL | string,
  pattern: string | string[],
  options?: micromatch.Options | null | undefined
): boolean {
  validateURLString(input, 'input')

  if (Array.isArray<string>(pattern)) {
    /**
     * Current index in {@linkcode pattern}.
     *
     * @var {number} i
     */
    let i: number = -1

    while (++i < pattern.length) validateString(pattern[i], `pattern[${i}]`)
    pattern = toPosix(pattern)
  } else {
    validateString(pattern, 'pattern')
    pattern = toPosix(pattern)
  }

  return micromatch.isMatch(toPosix(String(input)), pattern, {
    ...options,
    basename: options?.basename ?? true,
    cwd: options?.cwd ?? process.cwd(),
    windows: false
  })
}

export default matchesGlob
