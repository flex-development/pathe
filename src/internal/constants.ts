/**
 * @file Internal - Constants
 * @module pathe/internal/constants
 */

import type { WindowsDelimiter, WindowsSep } from '@flex-development/pathe'

/**
 * Drive path regex.
 *
 * @see https://computerhope.com/jargon/d/drivelet.htm
 * @see https://regex101.com/r/FsoDwJ
 *
 * @internal
 *
 * @const {RegExp} DRIVE_PATH_REGEX
 */
const DRIVE_PATH_REGEX: RegExp = /^(?<drive>(?<letter>[a-z]):(?:\/|\\{2})?)/i

/**
 * Windows path delimiter.
 *
 * @see {@linkcode WindowsDelimiter}
 *
 * @const {WindowsDelimiter} delimiterWindows
 */
const delimiterWindows: WindowsDelimiter = ';'

/**
 * Windows path segment separator.
 *
 * @see {@linkcode WindowsSep}
 *
 * @const {WindowsSep} sepWindows
 */
const sepWindows: WindowsSep = '\\'

export { delimiterWindows, DRIVE_PATH_REGEX, sepWindows }
