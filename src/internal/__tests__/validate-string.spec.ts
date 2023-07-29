/**
 * @file Unit Tests - validateString
 * @module pathe/internal/tests/unit/validateString
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import { cast } from '@flex-development/tutils'
import testSubject from '../validate-string'

describe('unit:internal/validateString', () => {
  let name: string

  beforeEach(() => {
    name = 'path'
  })

  it('should return value if value is a string', () => {
    // Arrange
    const value: string = faker.system.filePath()

    // Act + Expect
    expect(testSubject(value, name)).to.equal(value)
  })

  it('should throw if value is not a string', () => {
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
