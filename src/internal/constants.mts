/**
 * @file Internal - Constants
 * @module pathe/internal/constants
 */

import process from '#internal/process'
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
 * @internal
 *
 * @const {WindowsDelimiter} delimiterWindows
 */
const delimiterWindows: WindowsDelimiter = ';'

/**
 * Windows operating system?
 *
 * @internal
 *
 * @const {boolean} isWindows
 */
const isWindows: boolean = process.platform === 'win32'

/**
 * Windows path segment separator.
 *
 * @see {@linkcode WindowsSep}
 *
 * @internal
 *
 * @const {WindowsSep} sepWindows
 */
const sepWindows: WindowsSep = '\\'

export { delimiterWindows, DRIVE_PATH_REGEX, isWindows, sepWindows }
