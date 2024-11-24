/**
 * @file Interfaces - PathToFileUrlOptions
 * @module pathe/interfaces/PathToFileUrlOptions
 */

import type {
  PlatformOptions,
  ResolveWithOptions
} from '@flex-development/pathe'

/**
 * Options for converting paths to `file:` URLs.
 *
 * @see {@linkcode PlatformOptions}
 * @see {@linkcode ResolveWithOptions}
 *
 * @extends {PlatformOptions}
 * @extends {ResolveWithOptions}
 */
interface PathToFileUrlOptions extends PlatformOptions, ResolveWithOptions {
  /**
   * Return `file:` URL string?
   */
  string?: boolean | null | undefined
}

export type { PathToFileUrlOptions as default }
