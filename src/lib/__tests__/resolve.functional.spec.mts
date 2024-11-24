/**
 * @file Functional Tests - resolve
 * @module pathe/lib/tests/functional/resolve
 */

import testSubject from '#lib/resolve'
import * as resolveWith from '#lib/resolve-with'
import sep from '#lib/sep'
import type { MockInstance } from 'vitest'

describe('functional:lib/resolve', () => {
  let spy: MockInstance<(typeof resolveWith)['default']>

  beforeEach(() => {
    spy = vi.spyOn(resolveWith, 'default')
  })

  it('should call `resolveWith`', () => {
    // Arrange
    const paths: string[] = new URL(import.meta.url).pathname.split(sep)

    // Act
    testSubject(...paths)

    // Expect
    expect(spy).toHaveBeenCalledOnce()
    expect(spy.mock.lastCall).to.have.property('length', 1)
    expect(spy.mock.lastCall?.[0]).to.have.ordered.members(paths)
  })
})
