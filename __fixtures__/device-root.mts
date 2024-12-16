/**
 * @file Fixtures - DEVICE_ROOT
 * @module fixtures/device-root
 */

import DRIVE from '#fixtures/drive'
import { sepWindows } from '#internal/constants'
import type { DeviceRoot } from '@flex-development/pathe'

/**
 * Windows device root.
 *
 * @const {DeviceRoot} DEVICE_ROOT
 */
const DEVICE_ROOT: DeviceRoot = `${DRIVE}${sepWindows}`

export default DEVICE_ROOT
