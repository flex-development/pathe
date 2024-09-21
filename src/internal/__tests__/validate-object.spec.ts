/**
 * @file Unit Tests - validateObject
 * @module pathe/internal/tests/unit/validateObject
 */

import { codes, type ErrInvalidArgType } from '@flex-development/errnode'
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
    let error!: ErrInvalidArgType

    // Act
    try {
      testSubject(import.meta.url, name)
    } catch (e: unknown) {
      error = <typeof error>e
    }

    // Expect
    expect(error).to.be.instanceof(TypeError)
    expect(error).to.have.property('code', codes.ERR_INVALID_ARG_TYPE)
  })
})
