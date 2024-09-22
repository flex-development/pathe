/**
 * @file Unit Tests - fileURLToPath
 * @module pathe/lib/tests/unit/fileURLToPath
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-url-fileurltopath.js
 */

import process from '#internal/process'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import { fileURLToPath } from 'node:url'
import testSubject from '../file-url-to-path'
import toPosix from '../to-posix'

describe('unit:lib/fileURLToPath', () => {
  it.each<string>([
    '%2F',
    '%2f',
    '%5C',
    '%5c'
  ])('should throw if `url` contains encoded separators (%j)', separator => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject('file://' + process.cwd() + separator)
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_FILE_URL_PATH)
  })

  it.each<[unknown]>([
    [3],
    [null],
    [true],
    [undefined],
    [{}]
  ])('should throw if `url` is not an `URL` or string (%#)', url => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject(<URL | string>url)
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_ARG_TYPE)
  })

  it('should throw if `url` protocol is not `file:`', () => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject('https://a/b/c')
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_URL_SCHEME)
  })

  describe('posix', () => {
    it.each<Parameters<typeof testSubject>>([
      ['file:///foo=bar'],
      ['file:///foo;bar'],
      ['file:///foo:bar'],
      ['file:///foo.mjs'],
      ['file:///foo'],
      ['file:///foo&bar'],
      ['file:///foo%3Fbar'],
      ['file:///foo%25bar'],
      ['file:///foo%23bar'],
      ['file:///foo%20bar'],
      ['file:///foo%0Dbar'],
      ['file:///foo%0Abar'],
      ['file:///foo%09bar'],
      ['file:///foo%08bar'],
      ['file:///f%C3%B3%C3%B3b%C3%A0r'],
      ['file:///dir/foo'],
      ['file:///dir/'],
      ['file:///FOO'],
      ['file:///%F0%9F%9A%80'],
      ['file:///%E2%82%AC']
    ])('should return `url` as path (%#)', url => {
      // Act
      const result = testSubject(url)

      // Expect
      expect(result).to.eq(toPosix(fileURLToPath(url, { windows: false })))
    })

    it('should throw if `url` hostname is invalid', () => {
      // Arrange
      let error!: NodeError

      // Act
      try {
        testSubject(new URL('file://host/a'))
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.satisfy(isNodeError)
      expect(error).to.have.property('code', codes.ERR_INVALID_FILE_URL_HOST)
    })
  })

  describe('windows', () => {
    it.each<Parameters<typeof testSubject>>([
      ['file:///C:/%E2%82%AC'],
      ['file:///C:/%F0%9F%9A%80'],
      ['file:///C:/FOO'],
      ['file:///C:/dir/'],
      ['file:///C:/dir/foo'],
      ['file:///C:/f%C3%B3%C3%B3b%C3%A0r'],
      ['file:///C:/foo%08bar'],
      ['file:///C:/foo%09bar'],
      ['file:///C:/foo%0Abar'],
      ['file:///C:/foo%0Dbar'],
      ['file:///C:/foo%20bar'],
      ['file:///C:/foo%23bar'],
      ['file:///C:/foo%25bar'],
      ['file:///C:/foo%3Fbar'],
      ['file:///C:/foo&bar'],
      ['file:///C:/foo'],
      ['file:///C:/foo.mjs'],
      ['file:///C:/foo/bar'],
      ['file:///C:/foo:bar'],
      ['file:///C:/foo;bar'],
      ['file:///C:/foo=bar'],
      ['file://nas/My%20Docs/File.doc']
    ])('should return `url` as path (%#)', url => {
      // Arrange
      const windows: boolean = true

      // Act
      const result = testSubject(url, { windows })

      // Expect
      expect(result).to.eq(toPosix(fileURLToPath(url, { windows })))
    })

    it('should throw if path is not absolute', () => {
      // Arrange
      let error!: NodeError

      // Act
      try {
        testSubject(new URL('file:///?:/'), { windows: true })
      } catch (e: unknown) {
        error = <typeof error>e
      }

      // Expect
      expect(error).to.satisfy(isNodeError)
      expect(error).to.have.property('code', codes.ERR_INVALID_FILE_URL_PATH)
    })
  })
})
