/**
 * @file Unit Tests - DeviceRoot
 * @module pathe/types/tests/unit-d/DeviceRoot
 */

import type TestSubject from '../device-root'
import type DriveLetter from '../drive-letter'
import type Sep from '../sep'

describe('unit-d:types/DeviceRoot', () => {
  it('should equal `${DriveLetter}${Sep}`', () => {
    expectTypeOf<TestSubject>().toEqualTypeOf<`${DriveLetter}${Sep}`>()
  })
})
