/**
 * @file isDeviceRoot
 * @module pathe/lib/isDeviceRoot
 */

import { DRIVE_PATH_REGEX } from '#internal/constants'
import type { DeviceRoot } from '@flex-development/pathe'
import isSep from './is-sep'

/**
 * Check if `value` is a device root.
 *
 * @see {@linkcode DeviceRoot}
 *
 * @category
 *  utils
 *
 * @param {unknown} [value]
 *  Value to check
 * @return {value is DeviceRoot}
 *  `true` if `value` is device root, `false` otherwise
 */
function isDeviceRoot(value: unknown): value is DeviceRoot {
  return (
    typeof value === 'string' &&
    value.length === 3 &&
    DRIVE_PATH_REGEX.test(value) &&
    isSep(value[value.length - 1])
  )
}

export default isDeviceRoot
