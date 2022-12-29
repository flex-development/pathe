/**
 * @file Unit Tests - validateObject
 * @module pathe/internal/tests/unit/validateObject
 */

import { ErrorCode, type NodeError } from '@flex-development/errnode'
import testSubject from '../validate-object'

describe('unit:internal/validateObject', () => {
  let name: string

  beforeEach(() => {
    name = 'pathObject'
  })

  it('should return true if value is an object', () => {
    // Arrange
    const cases: Parameters<typeof testSubject>[0][] = [
      {},
      new Date(),
      JSON.parse(faker.datatype.json())
    ]

    // Act + Expect
    cases.forEach(value => expect(testSubject(value, name)).to.be.true)
  })

  it('should throw if value is not an object', () => {
    // Arrange
    const code: ErrorCode = ErrorCode.ERR_INVALID_ARG_TYPE
    const cases: Parameters<typeof testSubject>[0][] = [
      faker.datatype.array(),
      faker.datatype.bigInt(),
      faker.datatype.boolean(),
      faker.datatype.boolean(),
      faker.datatype.number(),
      faker.datatype.string()
    ]

    // Act + Expect
    cases.forEach(value => {
      let error: NodeError<TypeError>

      try {
        testSubject(value, name)
      } catch (e: unknown) {
        error = e as typeof error
      }

      expect(error!).to.be.instanceof(TypeError)
      expect(error!).to.have.property('code').equal(code)
    })
  })
})
