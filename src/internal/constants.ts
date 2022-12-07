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

/**
 * Universal naming convention (UNC) path regex.
 *
 * @see https://regex101.com/r/3P8YKp
 * @see https://learn.microsoft.com/dotnet/standard/io/file-path-formats#unc-paths
 *
 * @const {RegExp} UNC_PATH_REGEX
 */
const UNC_PATH_REGEX: RegExp =
  /^[/\\]{2,}(?<host>[^/\\]+)[/\\]+(?<share>[^/\\]+)(?:[/\\]+(?<dir>[^\n/\\]+))?(?:[/\\]+(?<file>[^\n/\\]+))?[/\\]*(?=\n?$)/

export { DRIVE_PATH_REGEX, UNC_PATH_REGEX }
