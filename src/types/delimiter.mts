/**
 * @file Type Aliases - Delimiter
 * @module pathe/types/Delimiter
 */

import type { PosixDelimiter, WindowsDelimiter } from '@flex-development/pathe'

/**
 * Union of path delimiters.
 *
 * @see {@linkcode PosixDelimiter}
 * @see {@linkcode WindowsDelimiter}
 */
type Delimiter = PosixDelimiter | WindowsDelimiter

export type { Delimiter as default }
