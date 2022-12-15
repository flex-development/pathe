/**
 * @file Type Tests - pathe
 * @module pathe/tests/unit-d/pathe
 */

import type path from 'node:path'
import type testSubject from '../pathe'

describe('unit-d:pathe', () => {
  it('should match typeof import("node:path")', () => {
    expectTypeOf<typeof testSubject>().toMatchTypeOf<typeof path>()
  })
})
