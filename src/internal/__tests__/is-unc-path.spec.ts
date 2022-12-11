/**
 * @file Unit Tests - isUncPath
 * @module pathe/internal/tests/unit/isUncPath
 */

import testSubject from '../is-unc-path'

describe('unit:internal/isUncPath', () => {
  it('should return false if path not UNC path', () => {
    expect(testSubject('C:\\temp\\myfile.html')).to.be.false
  })

  it('should return true if path is UNC path', () => {
    expect(testSubject('\\\\\\Server2\\Share\\Test\\Foo.txt', false)).to.be.true
  })

  describe('exact', () => {
    it('should return true if path starts with exactly two separators', () => {
      expect(testSubject('//host/share/file.ext', true)).to.be.true
      expect(testSubject('\\\\host\\share\\file.ext', true)).to.be.true
    })
  })
})
