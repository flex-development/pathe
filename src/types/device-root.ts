/**
 * @file Type Aliases - DeviceRoot
 * @module pathe/types/DeviceRoot
 */

import type { DriveLetter, Sep } from '@flex-development/pathe'

/**
 * Device root.
 */
type DeviceRoot = `${DriveLetter}${Sep}`

export type { DeviceRoot as default }
