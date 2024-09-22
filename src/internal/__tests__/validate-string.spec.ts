/**
 * @file Unit Tests - validateString
 * @module pathe/internal/tests/unit/validateString
 */

import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-string'

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
