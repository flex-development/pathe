/**
 * @file Type Aliases - Sep
 * @module pathe/types/Sep
 */

import type PosixSep from './sep-posix'
import type WindowsSep from './sep-windows'

/**
 * Union of path segment separators.
 *
 * @see {@linkcode PosixSep}
 * @see {@linkcode WindowsSep}
 */
type Sep = PosixSep | WindowsSep

export type { Sep as default }
