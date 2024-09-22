/**
 * @file Unit Tests - validateObject
 * @module pathe/internal/tests/unit/validateObject
 */

import { codes, isNodeError, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-object'

describe('unit:internal/validateObject', () => {
  let name: string

  beforeAll(() => {
    name = 'pathObject'
  })

  it('should return `true` if `value` is curly-braced object', () => {
    expect(testSubject({}, name)).to.be.true
  })

  it('should throw if `value` is not curly-braced object', () => {
    // Arrange
    let error!: NodeError

    // Act
    try {
      testSubject(import.meta.url, name)
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.satisfy(isNodeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_ARG_TYPE)
  })
})
