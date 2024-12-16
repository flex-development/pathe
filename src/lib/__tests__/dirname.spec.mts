/**
 * @file Unit Tests - dirname
 * @module pathe/lib/tests/unit/dirname
 * @see https://github.com/nodejs/node/blob/v23.4.0/test/parallel/test-path-dirname.js
 */

import DEVICE_ROOT from '#fixtures/device-root'
import DRIVE from '#fixtures/drive'
import process from '#internal/process'
import cwd from '#lib/cwd'
import testSubject from '#lib/dirname'
import dot from '#lib/dot'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'
import { posix, win32 } from 'node:path'

describe('unit:lib/dirname', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [''],
      ['/'],
      ['////'],
      ['//a'],
      ['/a'],
      ['/a/b'],
      ['/a/b/'],
      ['a'],
      ['foo']
    ])('should return directory name of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(posix.dirname(String(input)))
    })

    it.each<[...Parameters<typeof testSubject>, string?]>([
      ['file:'],
      ['file:' + posix.sep],
      ['file:' + posix.sep.repeat(2)],
      ['file:' + posix.sep.repeat(3)],
      ['file:' + posix.sep.repeat(2) + cwd(), 'file://' + posix.dirname(cwd())]
    ])('should return directory name of `input` url (%j)', (
      input,
      expected
    ) => {
      expect(testSubject(input)).to.eq(expected ?? input)
    })
  })

  describe('windows', () => {
    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it.each<Parameters<typeof testSubject>>([
      [''],
      ['/a'],
      ['/a/b'],
      ['/a/b/'],
      ['\\'],
      ['\\\\'],
      ['\\\\unc\\share'],
      ['\\\\unc\\share\\foo'],
      ['\\\\unc\\share\\foo\\'],
      ['\\\\unc\\share\\foo\\bar'],
      ['\\\\unc\\share\\foo\\bar\\'],
      ['\\\\unc\\share\\foo\\bar\\baz'],
      ['\\foo bar\\baz'],
      ['\\foo'],
      ['\\foo\\'],
      ['\\foo\\bar'],
      ['\\foo\\bar\\'],
      ['\\foo\\bar\\baz'],
      ['a'],
      ['c:\\foo bar\\baz'],
      ['c:\\foo'],
      ['c:\\foo\\'],
      ['c:\\foo\\bar'],
      ['c:\\foo\\bar\\'],
      ['c:\\foo\\bar\\baz'],
      ['c:foo bar\\baz'],
      ['c:foo'],
      ['c:foo\\'],
      ['c:foo\\bar'],
      ['c:foo\\bar\\'],
      ['c:foo\\bar\\baz'],
      ['dir\\file:stream'],
      ['foo'],
      [DRIVE.toLowerCase()],
      [DRIVE.toLowerCase() + dot],
      [DEVICE_ROOT.toLowerCase()]
    ])('should return directory name of `input` (%j)', input => {
      expect(testSubject(input)).to.eq(toPosix(win32.dirname(String(input))))
    })

    it.each<[...Parameters<typeof testSubject>, string?]>([
      ['file:' + win32.sep],
      ['file:' + win32.sep.repeat(2)],
      ['file:' + win32.sep.repeat(3)],
      ['file:' + win32.sep.repeat(3) + DRIVE],
      ['file:' + win32.sep.repeat(3) + DEVICE_ROOT],
      [
        'file:' + win32.sep.repeat(3) + cwdWindows(),
        'file:' + win32.sep.repeat(3) + win32.dirname(cwdWindows())
      ]
    ])('should return directory name of `input` url (%j)', (
      input,
      expected
    ) => {
      expect(testSubject(input)).to.eq(toPosix(expected ?? input))
    })
  })
})
