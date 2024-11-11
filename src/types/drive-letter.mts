/**
 * @file Type Aliases - DriveLetter
 * @module pathe/types/DriveLetter
 */

import type { PosixDelimiter } from '@flex-development/pathe'

/**
 * Union of lowercase letters.
 *
 * @internal
 */
type Letter =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'

/**
 * A windows drive letter.
 */
type DriveLetter = `${Letter | Uppercase<Letter>}${PosixDelimiter}`

export type { DriveLetter as default, Letter }
