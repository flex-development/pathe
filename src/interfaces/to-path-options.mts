/**
 * @file Interfaces - ToPathOptions
 * @module pathe/interfaces/ToPathOptions
 */

import type {
  FileUrlToPathOptions,
  PlatformOptions
} from '@flex-development/pathe'

/**
 * Options for converting values to paths.
 *
 * @see {@linkcode FileUrlToPathOptions}
 * @see {@linkcode PlatformOptions}
 *
 * @extends {FileUrlToPathOptions}
 * @extends {PlatformOptions}
 */
interface ToPathOptions extends FileUrlToPathOptions, PlatformOptions {}

export type { ToPathOptions as default }
