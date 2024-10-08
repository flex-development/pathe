/**
 * @file Unit Tests - posix
 * @module pathe/tests/unit/posix
 */

import * as pathe from '#pathe'
import testSubject from '@flex-development/pathe/posix'

describe('unit:posix', () => {
  it('should equal pathe.posix', () => {
    expect(testSubject).to.eq(pathe.posix)
  })
})
