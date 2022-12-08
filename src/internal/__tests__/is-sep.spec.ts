/**
 * @file Unit Tests - isSep
 * @module pathe/internal/tests/unit/isSep
 */

import { posix, win32 } from 'node:path'
import testSubject from '../is-sep'

describe('unit:internal/isSep', () => {
  it('should return false if value is not path separator', () => {
    expect(testSubject(win32.sep)).to.be.false
  })

  it('should return true if value is path separator', () => {
    expect(testSubject(posix.sep)).to.be.true
  })
})
