/**
 * @file Unit Tests - validateString
 * @module pathe/internal/tests/unit/validateString
 */

import ERR_INVALID_ARG_TYPE from '../err-invalid-arg-type'
import testSubject from '../validate-string'

describe('unit:internal/validateString', () => {
  let name: string

  beforeEach(() => {
    name = 'path'
  })

  it('should return true if value is typeof string', () => {
    expect(testSubject(faker.datatype.string(13), name)).to.be.true
  })

  it('should throw if value is not typeof string', () => {
    // Arrange
    let error: ERR_INVALID_ARG_TYPE

    // Act
    try {
      testSubject(null, name)
    } catch (e: unknown) {
      error = e as typeof error
    }

    // Expect
    expect(error!).to.be.instanceOf(ERR_INVALID_ARG_TYPE)
  })
})
