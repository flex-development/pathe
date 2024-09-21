/**
 * @file Type Aliases - DeviceRoot
 * @module pathe/types/DeviceRoot
 */

import type DriveLetter from './drive-letter'
import type Sep from './sep'

/**
 * Device root.
 */
type DeviceRoot = `${DriveLetter}${Sep}`

export type { DeviceRoot as default }
