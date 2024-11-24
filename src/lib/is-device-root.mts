/**
 * @file isDeviceRoot
 * @module pathe/lib/isDeviceRoot
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import isSep from '#lib/is-sep'
import type { DeviceRoot } from '@flex-development/pathe'

/**
 * Check if `value` is a device root.
 *
 * @see {@linkcode DeviceRoot}
 *
 * @category
 *  utils
 *
 * @this {void}
 *
 * @param {unknown} value
 *  The value to check
 * @return {value is DeviceRoot}
 *  `true` if `value` is device root, `false` otherwise
 */
function isDeviceRoot(this: void, value: unknown): value is DeviceRoot {
  return (
    typeof value === 'string' &&
    value.length === 3 &&
    DRIVE_PATH_REGEX.test(value) &&
    isSep(value[value.length - 1])
  )
}

export default isDeviceRoot
