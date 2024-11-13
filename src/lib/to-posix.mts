/**
 * @file toPosix
 * @module pathe/lib/toPosix
 */

import validateURLString from '#internal/validate-url-string'
import sep from '#lib/sep'

export default toPosix

/**
 * Make separators in `path` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @param {string} path
 *  The path to handle
 * @return {string}
 *  `path` with POSIX-compliant separators
 */
function toPosix(path: string): string

/**
 * Make separators in `url` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @param {string} url
 *  The `URL` to handle
 * @return {URL}
 *  `url` with POSIX-compliant separators
 */
function toPosix(url: URL): URL

/**
 * Make separators in `value` POSIX-compliant.
 *
 * Supports encoded separators (e.g. `%5C`, `%5c`).
 *
 * @category
 *  utils
 *
 * @param {URL | string} value
 *  The {@linkcode URL} or path to handle
 * @return {URL | string}
 *  `value` with POSIX-compliant separators
 */
function toPosix(value: URL | string): URL | string {
  validateURLString(value, 'value')

  if (typeof value === 'string') {
    return value.replace(/\\/g, sep)
      .replace(/(?:%5C)/g, '%2F')
      .replace(/(?:%5c)/g, '%2f')
  }

  return value.href = toPosix(value.href), value
}
