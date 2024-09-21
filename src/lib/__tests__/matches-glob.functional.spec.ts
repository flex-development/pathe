/**
 * @file Functional Tests - matchesGlob
 * @module pathe/lib/tests/functional/matchesGlob
 * @see https://github.com/nodejs/node/blob/v22.8.0/test/parallel/test-path-glob.js
 */

import process from '#internal/process'
import micromatch from 'micromatch'
import type { MockInstance } from 'vitest'
import testSubject from '../matches-glob'
import toPosix from '../to-posix'

describe('functional:lib/matchesGlob', () => {
  let spy: MockInstance<typeof micromatch['isMatch']>

  beforeEach(() => {
    spy = vi.spyOn(micromatch, 'isMatch')
  })

  it.each<Parameters<typeof testSubject>>([
    ['foo/bar/baz', 'foo/**'],
    ['foo/bar/baz', 'foo/*/!bar/*/baz'],
    ['foo/bar/baz', 'foo/[!bcr]ar/baz'],
    ['foo/bar/baz', 'foo/[bc-r]ar/baz'],
    ['foo/bar/baz', 'foo/[bcr]ar/baz'],
    ['foo/bar/baz/boo', 'foo/[bc-r]ar/baz/*', { ignore: 'f*' }],
    ['foo/bar/baz/boo', 'foo/[bc-r]ar/baz/*'],
    ['foo/bar1/baz', 'foo/bar[0-9]/baz'],
    ['foo/bar5/baz', 'foo/bar[0-9]/baz'],
    ['foo/barx/baz', 'foo/bar[a-z]/baz'],
    ['foo\\bar1\\baz', ['foo/bar[0-9]/baz']],
    ['foo\\bar1\\baz', ['foo\\bar[0-9]\\baz']],
    ['foo\\bar5\\baz', ['foo/bar[0-9]/baz']],
    ['foo\\bar5\\baz', ['foo\\bar[0-9]\\baz']],
    ['foo\\bar\\baz', 'foo\\*\\!bar\\*\\baz'],
    ['foo\\bar\\baz', 'foo\\[!bcr]ar\\baz'],
    ['foo\\bar\\baz', ['foo/**']],
    ['foo\\bar\\baz', ['foo/[bc-r]ar/baz']],
    ['foo\\bar\\baz', ['foo/[bcr]ar/baz']],
    ['foo\\bar\\baz', ['foo\\**']],
    ['foo\\bar\\baz', ['foo\\[bc-r]ar\\baz']],
    ['foo\\bar\\baz', ['foo\\[bcr]ar\\baz']],
    ['foo\\bar\\baz\\boo', 'foo\\[bc-r]ar\\baz\\*', { ignore: 'f*' }],
    ['foo\\bar\\baz\\boo', ['foo/[bc-r]ar/baz/*']],
    ['foo\\bar\\baz\\boo', ['foo\\[bc-r]ar\\baz\\*']],
    ['foo\\barx\\baz', ['foo/bar[a-z]/baz']],
    ['foo\\barx\\baz', ['foo\\bar[a-z]\\baz']]
  ])('should call `micromatch.isMatch` (%#)', (path, pattern, options) => {
    // Arrange
    const pat: typeof pattern = Array.isArray(pattern)
      ? pattern
      : toPosix(pattern)

    // Act
    testSubject(path, pattern, options)

    // Expect
    expect(spy).toHaveBeenCalledOnce()
    expect(spy.mock.lastCall?.[0]).to.eq(toPosix(path))
    expect(spy.mock.lastCall?.[1]).to.eq(pat)
    expect(spy.mock.lastCall?.[2]).to.eql({ ...options, cwd: process.cwd() })
  })
})
