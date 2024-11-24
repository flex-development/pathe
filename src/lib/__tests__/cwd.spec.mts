/**
 * @file Unit Tests - cwd
 * @module pathe/lib/tests/unit/cwd
 */

import DRIVE from '#fixtures/drive'
import process from '#internal/process'
import testSubject from '#lib/cwd'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'

describe('unit:lib/cwd', () => {
  describe('posix', () => {
    it('should return path to current working directory', () => {
      expect(testSubject()).to.eq(process.cwd())
    })
  })

  describe('windows', () => {
    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it('should return path to current working directory', () => {
      expect(testSubject()).to.startWith(DRIVE).and.eq(toPosix(process.cwd()))
    })
  })
})
