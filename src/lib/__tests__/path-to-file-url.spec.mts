/**
 * @file Unit Tests - pathToFileURL
 * @module pathe/lib/tests/unit/pathToFileURL
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-url-pathtofileurl.js
 */

import DRIVE from '#fixtures/drive'
import { sepWindows } from '#internal/constants'
import process from '#internal/process'
import testSubject from '#lib/path-to-file-url'
import sep from '#lib/sep'
import toPosix from '#lib/to-posix'
import cwdWindows from '#tests/utils/cwd-windows'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import { pathToFileURL } from 'node:url'

describe('unit:lib/pathToFileURL', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      [sep + 'FOO'],
      [sep + 'dir/'],
      [sep + 'dir/foo'],
      [sep + 'foo bar'],
      [sep + 'foo#bar'],
      [sep + 'foo%bar'],
      [sep + 'foo&bar'],
      [sep + 'foo'],
      [sep + 'foo.mjs'],
      [sep + 'foo:bar']
    ])('should return `path` as `file:` URL (%j)', path => {
      // Act
      const result = testSubject(path)

      // Expect
      expect(result).to.eql(pathToFileURL(path, { windows: false }))
    })

    it.each<Parameters<typeof testSubject>>([
      [sep + 'foo;bar'],
      [sep + 'foo=bar'],
      [sep + 'foo?bar'],
      [sep + 'foo\bbar'],
      [sep + 'foo\nbar'],
      [sep + 'foo\rbar'],
      [sep + 'foo\tbar'],
      [sep + 'fóóbàr'],
      [sep + '€'],
      [sep + '🚀']
    ])('should return `path` as `file:` URL string (%j)', path => {
      // Act
      const result = testSubject(path, { string: true })

      // Expect
      expect(result).to.eql(String(pathToFileURL(path, { windows: false })))
    })
  })

  describe('windows', () => {
    let windows: true

    beforeAll(() => {
      windows = true
    })

    beforeEach(() => {
      vi.spyOn(process, 'cwd').mockImplementation(cwdWindows)
    })

    it.each<Parameters<typeof testSubject>>([
      [DRIVE + sepWindows + 'FOO'],
      [DRIVE + sepWindows + 'dir\\'],
      [DRIVE + sepWindows + 'dir\\foo'],
      [DRIVE + sepWindows + 'foo bar'],
      [DRIVE + sepWindows + 'foo#bar'],
      [DRIVE + sepWindows + 'foo%bar'],
      [DRIVE + sepWindows + 'foo&bar'],
      [DRIVE + sepWindows + 'foo'],
      [DRIVE + sepWindows + 'foo.mjs'],
      [DRIVE + sepWindows + 'foo:bar'],
      [DRIVE + sepWindows + 'foo;bar'],
      [DRIVE + sepWindows + 'foo=bar'],
      [DRIVE + sepWindows + 'foo?bar']
    ])('should return `path` as `file:` URL (%j)', path => {
      // Act
      const result = testSubject(path, { windows })

      // Expect
      expect(result).to.eql(toPosix(pathToFileURL(path, { windows })))
    })

    it.each<Parameters<typeof testSubject>>([
      [DRIVE + sepWindows + '\\foo\\bar'],
      [DRIVE + sepWindows + '\\foo\bbar'],
      [DRIVE + sepWindows + '\\foo\nbar'],
      [DRIVE + sepWindows + '\\foo\rbar'],
      [DRIVE + sepWindows + '\\foo\tbar'],
      [DRIVE + sepWindows + '\\fóóbàr'],
      [DRIVE + sepWindows + '\\€'],
      [DRIVE + sepWindows + '\\🚀'],
      [sepWindows.repeat(2) + '?\\C:\\path\\to\\file.txt'],
      [sepWindows.repeat(2) + '?\\UNC\\server\\share\\folder\\file.txt'],
      [sepWindows.repeat(2) + 'nas\\My Docs\\File.doc'],
      [sepWindows.repeat(2) + 'nas\\share\\path.txt']
    ])('should return `path` as `file:` URL string (%j)', path => {
      // Act
      const result = testSubject(path, { string: true, windows })

      // Expect
      expect(result).to.eq(toPosix(String(pathToFileURL(path, { windows }))))
    })

    it.each<Parameters<typeof testSubject>>([
      ['\\\\host'],
      ['\\\\\\no-server']
    ])('should throw if UNC path hostname is invalid (%j)', path => {
      // Arrange
      let error!: NodeError

      // Act
      try {
        testSubject(path, { windows: true })
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.satisfy(isNodeError)
      expect(error).to.have.property('code', codes.ERR_INVALID_ARG_VALUE)
    })
  })
})
