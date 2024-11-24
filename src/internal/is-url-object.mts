/**
 * @file Internal - isURLObject
 * @module pathe/internal/isURLObject
 * @see https://github.com/nodejs/node/blob/v23.2.0/lib/internal/url.js#L755-L772
 */

/**
 * Object that looks like WHATWG URL object.
 *
 * @internal
 */
interface URLLike {
  /**
   * Serialized URL.
   */
  href: string

  /**
   * Path portion of URL.
   */
  pathname: string

  /**
   * Protocol portion of URL.
   */
  protocol: string
}

/**
 * Check if `value` has the shape of a WHATWG URL object.
 *
 * Using a symbol or `instanceof` would not be able to recognize `URL` objects
 * coming from other implementations (e.g. in Electron), so some well known
 * properties are checked instead.
 *
 * The `href` and `protocol` properties are checked because they are easy to
 * retrieve and calculate due to the lazy nature of the getters.
 *
 * The `auth` and `path` properties are checked to distinguish between legacy
 * url instances and the WHATWG URL object.
 *
 * @internal
 *
 * @param {unknown} value
 *  Value to check
 * @return {value is URLLike}
 *  `true` if `value` looks like WHATWG URL object, `false` otherwise
 */
function isURLObject(value: unknown): value is URLLike {
  return Boolean(
    value !== null &&
      typeof value === 'object' &&
      'href' in value &&
      'pathname' in value &&
      'protocol' in value &&
      typeof value.href === 'string' &&
      typeof value.pathname === 'string' &&
      typeof value.protocol === 'string' &&
      value.href &&
      value.protocol &&
      (value as Record<string, unknown>)['auth'] === undefined &&
      (value as Record<string, unknown>)['path'] === undefined
  )
}

export default isURLObject
