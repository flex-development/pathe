/**
 * @file Unit Tests - toNamespacedPath
 * @module pathe/lib/tests/unit/toNamespacedPath
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-path-makelong.js
 */

import process from '#internal/process'
import testSubject from '#lib/to-namespaced-path'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'
import { win32 } from 'node:path'

describe('unit:lib/toNamespacedPath', () => {
  describe('windows', () => {
    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it.each<Parameters<typeof testSubject>>([
      [''],
      ['//foo//bar'],
      ['C:/foo'],
      ['C:\\foo'],
      ['T:/bar'],
      ['T:\\bar'],
      ['\\\\.\\pipe\\somepipe'],
      ['\\\\?\\UNC\\someserver\\someshare\\somefile'],
      ['\\\\?\\c:\\Windows/System'],
      ['\\\\?\\foo'],
      ['\\\\foo\\bar'],
      ['\\\\someserver\\someshare\\somefile']
    ])('should return namespace-prefixed path (%j)', path => {
      // Act
      const result = testSubject(path)

      // Expect
      expect(result).to.eq(toPosix(win32.toNamespacedPath(path)))
    })
  })
})
