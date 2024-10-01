/**
 * @file Unit Tests - win32
 * @module pathe/tests/unit/win32
 */

import * as pathe from '#pathe'
import testSubject from '@flex-development/pathe/win32'

describe('unit:win32', () => {
  it('should equal pathe.win32', () => {
    expect(testSubject).to.eq(pathe.win32)
  })
})
