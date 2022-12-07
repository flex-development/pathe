/**
 * @file Unit Tests - isDrivePath
 * @module pathe/internal/tests/unit/isDrivePath
 */

import testSubject from '../is-drive-path'

describe('unit:internal/isDrivePath', () => {
  it('should return false if path does not start with disk designator', () => {
    expect(testSubject('/tmp/myfile.html')).to.be.false
  })

  it('should return true if path starts with disk designator', () => {
    expect(testSubject('C:\\temp\\myfile.html')).to.be.true
  })
})
