/**
 * @file Internal - Constants
 * @module pathe/internal/constants
 */

/**
 * Drive path regex.
 *
 * Determines if a path starts with a [drive letter][1].
 *
 * [1]: https://computerhope.com/jargon/d/drivelet.htm
 *
 * @see https://regex101.com/r/FsoDwJ
 *
 * @const {RegExp} DRIVE_PATH_REGEX
 */
const DRIVE_PATH_REGEX: RegExp = /^(?<drive>(?<letter>[a-z]):)/i

export { DRIVE_PATH_REGEX }
