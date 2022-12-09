/**
 * @file Unit Tests - validateObject
 * @module pathe/internal/tests/unit/validateObject
 */

import ERR_INVALID_ARG_TYPE from '../err-invalid-arg-type'
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
      let error: ERR_INVALID_ARG_TYPE

      try {
        testSubject(value, name)
      } catch (e: unknown) {
        error = e as typeof error
      }

      expect(error!).to.be.instanceOf(ERR_INVALID_ARG_TYPE)
    })
  })
})
