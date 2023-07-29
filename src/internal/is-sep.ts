/**
 * @file Internal - isSep
 * @module pathe/internal/isSep
 */

import sep from '#src/lib/sep'
import type { Sep } from '#src/types'

/**
 * Checks if `value` is a path separator.
 *
 * [1]: {@link ../lib/sep.ts}
 *
 * @see [`sep`][1]
 *
 * @internal
 *
 * @param {unknown} value - Possible path separator
 * @return {value is Sep} `true` if `str` is path separator
 */
const isSep = (value: unknown): value is Sep => sep === value

export default isSep
