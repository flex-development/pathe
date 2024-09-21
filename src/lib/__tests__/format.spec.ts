/**
 * @file Unit Tests - format
 * @module pathe/lib/tests/unit/format
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-parse-format.js
 */

import { posix, win32 } from 'node:path'
import testSubject from '../format'
import toPosix from '../to-posix'

describe('unit:lib/format', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [{}],
      [null],
      [{ root: '/' }],
      [{ dir: 'some/dir' }],
      [{ base: 'index.html' }],
      [{ ext: '.png', name: 'x' }],
      [{ ext: '.html', name: 'index' }],
      [{ ext: '.html', name: 'index', root: '/' }],
      [{ dir: 'some/dir', ext: '.html', name: 'index' }],
      [{ base: '', dir: 'lib', ext: '.mjs', name: 'index', root: '' }]
    ])('should return string string (%#)', pathObject => {
      // @ts-expect-error ts(2345)
      expect(testSubject(pathObject)).to.eq(posix.format({ ...pathObject }))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      [{}],
      [null],
      [{ root: 'C:\\' }],
      [{ dir: 'some\\dir' }],
      [{ base: 'index.html' }],
      [{ ext: '.html', name: 'index' }],
      [{ ext: '.html', name: 'index', root: 'C:\\' }],
      [{ dir: 'some\\dir', ext: '.html', name: 'index' }]
    ])('should return string string (%#)', pathObject => {
      // @ts-expect-error ts(2345)
      expect(testSubject(pathObject)).to.eq(toPosix(win32.format({
        ...pathObject
      })))
    })
  })
})
