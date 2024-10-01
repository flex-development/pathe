/**
 * @file Unit Tests - validateString
 * @module pathe/internal/tests/unit/validateString
 */

import testSubject from '#internal/validate-string'
import { codes, isNodeError, type NodeError } from '@flex-development/errnode'

describe('unit:internal/validateString', () => {
  let name: string

  beforeAll(() => {
    name = 'path'
  })

  it('should return `true` if `value` is a string', () => {
    expect(testSubject(faker.system.filePath(), name)).to.be.true
  })

  it('should throw if `value` is not a string', () => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject(null, name)
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_ARG_TYPE)
  })
})
