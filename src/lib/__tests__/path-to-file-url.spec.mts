/**
 * @file Unit Tests - pathToFileURL
 * @module pathe/lib/tests/unit/pathToFileURL
 * @see https://github.com/nodejs/node/blob/v23.2.0/test/parallel/test-url-pathtofileurl.js
 */

import testSubject from '#lib/path-to-file-url'
import toPosix from '#lib/to-posix'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import { pathToFileURL } from 'node:url'

describe('unit:lib/pathToFileURL', () => {
  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      ['/FOO'],
      ['/dir/'],
      ['/dir/foo'],
      ['/foo bar'],
      ['/foo#bar'],
      ['/foo%bar'],
      ['/foo&bar'],
      ['/foo'],
      ['/foo.mjs'],
      ['/foo:bar'],
      ['/foo;bar'],
      ['/foo=bar'],
      ['/foo?bar'],
      ['/foo\bbar'],
      ['/foo\nbar'],
      ['/foo\rbar'],
      ['/foo\tbar'],
      ['/fóóbàr'],
      ['/€'],
      ['/🚀']
    ])('should return `path` as `file:` URL (%#)', path => {
      // Act
      const result = testSubject(path)

      // Expect
      expect(result).to.eql(pathToFileURL(path, { windows: false }))
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      ['C:\\FOO'],
      ['C:\\dir\\'],
      ['C:\\dir\\foo'],
      ['C:\\foo bar'],
      ['C:\\foo#bar'],
      ['C:\\foo%bar'],
      ['C:\\foo&bar'],
      ['C:\\foo'],
      ['C:\\foo.mjs'],
      ['C:\\foo:bar'],
      ['C:\\foo;bar'],
      ['C:\\foo=bar'],
      ['C:\\foo?bar'],
      ['C:\\foo\\bar'],
      ['C:\\foo\bbar'],
      ['C:\\foo\nbar'],
      ['C:\\foo\rbar'],
      ['C:\\foo\tbar'],
      ['C:\\fóóbàr'],
      ['C:\\€'],
      ['C:\\🚀'],
      ['\\\\?\\C:\\path\\to\\file.txt'],
      ['\\\\?\\UNC\\server\\share\\folder\\file.txt'],
      ['\\\\nas\\My Docs\\File.doc'],
      ['\\\\nas\\share\\path.txt']
    ])('should return `path` as `file:` URL (%#)', path => {
      // Arrange
      const windows: boolean = true
      const url: URL = pathToFileURL(path, { windows })

      // Act
      const result = testSubject(path, { windows })

      // Expect
      expect(result.href).to.eq(toPosix(url.href))
      expect(result.pathname).to.eq(toPosix(url.pathname))
    })

    it.each<Parameters<typeof testSubject>>([
      ['\\\\host'],
      ['\\\\\\no-server']
    ])('should throw if UNC path hostname is invalid (%#)', path => {
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
