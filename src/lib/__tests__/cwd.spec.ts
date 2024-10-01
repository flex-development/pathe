/**
 * @file Unit Tests - cwd
 * @module pathe/lib/tests/unit/cwd
 */

import process from '#internal/process'
import testSubject from '#lib/cwd'

describe('unit:lib/cwd', () => {
  it('should return path to current working directory', () => {
    expect(testSubject()).to.eq(process.cwd())
  })
})
