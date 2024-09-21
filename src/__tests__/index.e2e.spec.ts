/**
 * @file E2E Tests - api
 * @module pathe/tests/e2e/api
 */

import * as testSubject from '../index'

describe('e2e:pathe', () => {
  it('should expose public api', () => {
    expect(Object.keys(testSubject)).toMatchSnapshot()
  })
})
