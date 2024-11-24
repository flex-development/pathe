/**
 * @file extToValue
 * @module pathe/lib/extToValue
 */

import basename from '#lib/basename'
import dot from '#lib/dot'
import type { EmptyString, Ext } from '@flex-development/pathe'

/**
 * Get a value for `input` based on its file extension.
 *
 * This algorithm picks the value with the longest matching file extension,
 * so if `map` has the keys `'.mts'` and `'.d.mts'`, the value for `'.d.mts'`
 * will be returned.
 *
 * @see {@linkcode EmptyString}
 * @see {@linkcode Ext}
 *
 * @category
 *  utils
 *
 * @template {any} T
 *  Map value
 *
 * @this {void}
 *
 * @param {URL | string} input
 *  The {@linkcode URL}, URL string, or path to handle
 * @param {Partial<Record<EmptyString | Ext, T>>} map
 *  Extension map
 * @return {T | undefined}
 *  Value based on file extension of `input`
 */
function extToValue<T>(
  this: void,
  input: URL | string,
  map: Partial<Record<EmptyString | Ext, T>>
): T | undefined {
  /**
   * Basename to check.
   *
   * @var {string} base
   */
  let base: string = basename(input)

  /**
   * Index of {@linkcode dot}.
   *
   * @var {number} index
   */
  let index: number = base.indexOf(dot)

  /**
   * Current value.
   *
   * @var {T | undefined} value
   */
  let value: T | undefined

  if (index === -1) {
    value = map['']
  } else {
    while (true) {
      value = map[base.slice(index) as EmptyString | Ext]

      if (value === undefined) {
        base = base.slice(index + 1)

        /**
         * Next index of {@linkcode dot}.
         *
         * @const {number} nextIndex
         */
        const nextIndex: number = base.indexOf(dot)

        if (nextIndex !== -1) {
          index = nextIndex
          continue
        }
      }

      break
    }
  }

  return value
}

export default extToValue
