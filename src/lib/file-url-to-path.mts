/**
 * @file fileURLToPath
 * @module pathe/lib/fileURLToPath
 */

import { isWindows } from '#internal/constants'
import domainToUnicode from '#internal/domain-to-unicode'
import process from '#internal/process'
import validateFileURL from '#internal/validate-file-url'
import isDeviceRoot from '#lib/is-device-root'
import isSep from '#lib/is-sep'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import {
  ERR_INVALID_FILE_URL_HOST,
  ERR_INVALID_FILE_URL_PATH,
  type ErrInvalidFileUrlHost,
  type ErrInvalidFileUrlPath,
  type ErrInvalidUrlScheme
} from '@flex-development/errnode'
import type { FileUrlToPathOptions } from '@flex-development/pathe'

/**
 * Convert a `file:` URL to a path.
 *
 * @see {@linkcode ErrInvalidFileUrlHost}
 * @see {@linkcode ErrInvalidFileUrlPath}
 * @see {@linkcode ErrInvalidUrlScheme}
 * @see {@linkcode FileUrlToPathOptions}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {URL | string} url
 *  The `file:` URL object or string to convert to a path
 * @param {FileUrlToPathOptions | null | undefined} [options]
 *  Conversion options
 * @return {string}
 *  `url` as path
 * @throws {ErrInvalidFileUrlHost}
 * @throws {ErrInvalidFileUrlPath}
 * @throws {ErrInvalidUrlScheme}
 */
function fileURLToPath(
  this: void,
  url: URL | string,
  options?: FileUrlToPathOptions | null | undefined
): string {
  validateFileURL(url, 'url')
  if (typeof url === 'string') url = new URL(url)

  /**
   * URL pathname.
   *
   * @var {string} pathname
   */
  let pathname: string = toPosix(url).pathname

  // check for encoded separators
  if (/(?:%2f)/i.test(pathname)) {
    /**
     * Error message.
     *
     * @const {string} message
     */
    const message: string = 'must not include encoded "/" or "\\" characters'

    throw new ERR_INVALID_FILE_URL_PATH(message)
  }

  // decode pathname
  pathname = decodeURIComponent(pathname)

  /**
   * Windows operating system?
   *
   * @const {boolean} windows
   */
  const windows: boolean = options?.windows ?? /* c8 ignore next */ isWindows

  // hostname -> UNC path
  if (url.hostname) {
    if (windows) {
      // pass the hostname through domainToUnicode just in case it is an IDN
      // using punycode encoding.
      // note: this only causes IDNs with an `xn--` prefix to be decoded.
      pathname = `${sep}${sep}${domainToUnicode(url.hostname)}${pathname}`
    } else {
      throw new ERR_INVALID_FILE_URL_HOST(process.platform)
    }
  }

  // drive path
  if (isSep(pathname[0]) && isDeviceRoot(pathname.slice(1, 4))) {
    if (!url.hostname) pathname = pathname.slice(1)
  } else if (windows && !url.hostname) {
    throw new ERR_INVALID_FILE_URL_PATH('must be absolute')
  }

  return pathname
}

export default fileURLToPath
