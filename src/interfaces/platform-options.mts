/**
 * @file Interfaces - PlatformOptions
 * @module pathe/lib/PlatformOptions
 */

/**
 * Platform-specific options.
 */
interface PlatformOptions {
  /**
   * Use windows-specific logic.
   */
  windows?: boolean | null | undefined
}

export type { PlatformOptions as default }
