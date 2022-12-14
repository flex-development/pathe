/**
 * @file Unit Tests - validateString
 * @module pathe/internal/tests/unit/validateString
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-string'

describe('unit:internal/validateString', () => {
  let name: string

  beforeEach(() => {
    name = 'path'
  })

  it('should return value if value is typeof string', () => {
    expect(testSubject(faker.datatype.string(13), name)).to.be.a('string')
  })

  it('should throw if value is not typeof string', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE
    let error: NodeError<TypeError>

    // Act
    try {
      testSubject(null, name)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error!).to.be.instanceof(TypeError)
    expect(error!).to.have.property('code').equal(code)
  })
})
