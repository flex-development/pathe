/**
 * @file pathToFileURL
 * @module pathe/lib/pathToFileURL
 */

import domainToASCII from '#internal/domain-to-ascii'
import validateString from '#internal/validate-string'
import {
  ERR_INVALID_ARG_VALUE,
  type ErrInvalidArgValue
} from '@flex-development/errnode'
import type { PlatformOptions } from '@flex-development/pathe'
import isSep from './is-sep'
import resolve from './resolve'
import sep from './sep'
import toPosix from './to-posix'

export default pathToFileURL

/**
 * Convert a file `path` to a `file:` {@linkcode URL}.
 *
 * > The following characters are percent-encoded when converting from file path
 * > to a `URL`:
 * >
 * > - %: Only character not encoded by the `pathname` setter
 * > - CR: Stripped out by the `pathname` setter (see [`whatwg/url#419`][419])
 * > - LF: Stripped out by the `pathname` setter (see [`whatwg/url#419`][419])
 * > - TAB: Stripped out by the `pathname` setter
 *
 * [419]: https://github.com/whatwg/url/issues/419
 *
 * @see {@linkcode ErrInvalidArgValue}
 * @see {@linkcode PlatformOptions}
 *
 * @category
 *  utils
 *
 * @param {URL | string} path
 *  Path to handle
 * @param {PlatformOptions | null | undefined} [options]
 *  Platform options
 * @return {URL}
 *  `path` as `file:` URL
 * @throws {ErrInvalidArgValue}
 */
function pathToFileURL(
  path: string,
  options?: PlatformOptions | null | undefined
): URL {
  validateString(path, 'path')
  path = toPosix(path)

  // UNC path format: \\server\share\resource
  // handle extended and standard UNC path
  // "\\?\UNC\" path prefix should be ignored.
  // ref: https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation
  if (options?.windows && path.startsWith(sep.repeat(2))) {
    /**
     * Length of UNC path prefix.
     *
     * @const {number} prefixLength
     */
    const prefixLength: number = path.startsWith(`${sep}${sep}?${sep}UNC${sep}`)
      ? 8
      : 2

    /**
     * End index of hostname.
     *
     * @const {number} hostnameEndIndex
     */
    const hostnameEndIndex: number = path.indexOf(sep, prefixLength)

    // throw if hostname is invalid
    if (hostnameEndIndex === -1 || hostnameEndIndex === 2) {
      /**
       * Error message.
       *
       * @const {string} reason
       */
      const reason: string = hostnameEndIndex < 0
        ? 'Missing UNC resource path'
        : 'Empty UNC servername'

      throw new ERR_INVALID_ARG_VALUE('path', path, reason)
    }

    /**
     * File URL.
     *
     * @const {URL} outURL
     */
    const outURL: URL = new URL('file://')

    outURL.hostname = domainToASCII(path.slice(prefixLength, hostnameEndIndex))
    outURL.pathname = encodePathChars(path.slice(hostnameEndIndex))

    return outURL
  }

  /**
   * Last character in path.
   *
   * @const {string} lastChar
   */
  const lastChar: string = path[path.length - 1]!

  /**
   * Resolved path.
   *
   * @var {string} resolved
   */
  let resolved: string = resolve(path)

  // resolve strips trailing slash -> add it back
  if (isSep(lastChar) && !isSep(resolved[resolved.length - 1])) resolved += sep

  // call `encodePathChars` first to avoid encoding % again for ? and #
  resolved = encodePathChars(resolved)

  // question and hash characters should be included in pathname.
  // encoding is required to eliminate parsing them in different states.
  // this is done as an optimization so that a URL instance is not created and
  // the pathname setter is not triggered, which impacts performance
  if (resolved.includes('?')) resolved = resolved.replace(/\?/g, '%3F')
  if (resolved.includes('#')) resolved = resolved.replace(/#/g, '%23')

  return new URL(`file://${resolved}`)
}

/**
 * Encode special characters in `path`.
 *
 * @internal
 *
 * @param {string} path
 *  Path to handle
 * @return {string}
 *  `path` with special characters encoded
 */
function encodePathChars(path: string): string {
  if (path.includes('%')) path = path.replace(/%/g, '%25')
  if (path.includes('\n')) path = path.replace(/\n/g, '%0A')
  if (path.includes('\r')) path = path.replace(/\r/g, '%0D')
  if (path.includes('\t')) path = path.replace(/\t/g, '%09')
  return path
}
