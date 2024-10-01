/**
 * @file Type Aliases - Sep
 * @module pathe/types/Sep
 */

import type { PosixSep, WindowsSep } from '@flex-development/pathe'

/**
 * Union of path segment separators.
 *
 * @see {@linkcode PosixSep}
 * @see {@linkcode WindowsSep}
 */
type Sep = PosixSep | WindowsSep

export type { Sep as default }
