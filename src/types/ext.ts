/**
 * @file Type Aliases - Ext
 * @module pathe/types/Ext
 */

import type Dot from './dot'

/**
 * File extension schema.
 *
 * @see {@linkcode Dot}
 */
type Ext = `${Dot}${string}`

export type { Ext as default }
