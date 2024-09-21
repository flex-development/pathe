/**
 * @file Type Aliases - Delimiter
 * @module pathe/types/Delimiter
 */

import type PosixDelimiter from './delimiter-posix'
import type WindowsDelimiter from './delimiter-windows'

/**
 * Union of path delimiters.
 *
 * @see {@linkcode PosixDelimiter}
 * @see {@linkcode WindowsDelimiter}
 */
type Delimiter = PosixDelimiter | WindowsDelimiter

export type { Delimiter as default }
