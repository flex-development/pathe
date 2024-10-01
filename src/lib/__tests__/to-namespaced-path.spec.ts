/**
 * @file Unit Tests - toNamespacedPath
 * @module pathe/lib/tests/unit/toNamespacedPath
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-makelong.js
 */

import testSubject from '#lib/to-namespaced-path'
import toPosix from '#lib/to-posix'
import { win32 } from 'node:path'

describe('unit:lib/toNamespacedPath', () => {
  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['//foo//bar'],
      ['C:/foo'],
      ['C:\\foo'],
      ['\\\\.\\pipe\\somepipe'],
      ['\\\\?\\UNC\\someserver\\someshare\\somefile'],
      ['\\\\?\\c:\\Windows/System'],
      ['\\\\?\\foo'],
      ['\\\\foo\\bar'],
      ['\\\\someserver\\someshare\\somefile']
    ])('should return namespace-prefixed path (%#)', path => {
      // Act
      const result = testSubject(path)

      // Expect
      expect(result).to.eq(toPosix(win32.toNamespacedPath(path)))
    })
  })
})
