/**
 * @file Unit Tests - DeviceRoot
 * @module pathe/types/tests/unit-d/DeviceRoot
 */

import type TestSubject from '#types/device-root'
import type { DriveLetter, Sep } from '@flex-development/pathe'

describe('unit-d:types/DeviceRoot', () => {
  it('should equal `${DriveLetter}${Sep}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${DriveLetter}${Sep}`>()
  })
})
