/**
 * @file Interfaces - ResolveWithOptions
 * @module pathe/interfaces/ResolveWithOptions
 */

import type { Cwd } from '@flex-development/pathe'

/**
 * Path resolution options.
 */
interface ResolveWithOptions {
  /**
   * Get the path to the current working directory.
   *
   * @see {@linkcode Cwd}
   */
  cwd?: Cwd | null | undefined

  /**
   * Environment variables.
   */
  env?: Partial<Record<string, string>> | null | undefined
}

export type { ResolveWithOptions as default }
