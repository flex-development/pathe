/**
 * @file Units Tests - ERR_INVALID_ARG_TYPE
 * @module pathe/internal/tests/unit/ERR_INVALID_ARG_TYPE
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import TestSubject from '../err-invalid-arg-type'

describe('unit:internal/ERR_INVALID_ARG_TYPE', () => {
  let result: NodeError<TypeError>

  beforeEach(() => {
    result = new TestSubject('path', 'string', null)
  })

  it('should return TypeError instance', () => {
    expect(result).to.be.instanceof(TypeError)
  })

  it('should set error code', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE

    // Expect
    expect(result).to.have.property('code').equal(code)
  })

  it('should set error message', () => {
    // Arrange
    const message: string =
      'The "path" argument must be of type string. Received null'

    // Expect
    expect(result).to.have.property('message').equal(message)
  })
})
