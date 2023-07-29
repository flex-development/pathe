/**
 * @file Unit Tests - validateObject
 * @module pathe/internal/tests/unit/validateObject
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import { cast } from '@flex-development/tutils'
import testSubject from '../validate-object'

describe('unit:internal/validateObject', () => {
  let name: string

  beforeEach(() => {
    name = 'pathObject'
  })

  it('should return true if value is a curly-braced object', () => {
    expect(testSubject({}, name)).to.be.true
  })

  it('should throw if value is not a curly-braced object', () => {
    // Arrange
    let error!: NodeError<TypeError>

    // Act
    try {
      testSubject(null, name)
    } catch (e: unknown) {
      error = cast(e)
    }

    // Expect
    expect(error)
      .to.be.instanceof(TypeError)
      .with.property('code', ErrorCode.ERR_INVALID_ARG_TYPE)
  })
})
