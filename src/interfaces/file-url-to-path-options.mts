/**
 * @file Interfaces - FileUrlToPathOptions
 * @module pathe/interfaces/FileUrlToPathOptions
 */

import type { PlatformOptions } from '@flex-development/pathe'

/**
 * Options for converting `file:` URLs to paths.
 *
 * @see {@linkcode PlatformOptions}
 *
 * @extends {PlatformOptions}
 */
interface FileUrlToPathOptions extends PlatformOptions {}

export type { FileUrlToPathOptions as default }
