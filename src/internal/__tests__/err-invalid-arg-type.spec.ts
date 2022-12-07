/**
 * @file Units Tests - ERR_INVALID_ARG_TYPE
 * @module pathe/internal/tests/unit/ERR_INVALID_ARG_TYPE
 */

import { inspect } from 'node-inspect-extracted'
import TestSubject from '../err-invalid-arg-type'

describe('unit:internal/ERR_INVALID_ARG_TYPE', () => {
  let code: string
  let subject: TestSubject

  beforeEach(() => {
    code = 'ERR_INVALID_ARG_TYPE'
    subject = new TestSubject('path', 'string', null)
  })

  describe('constructor', () => {
    it('should set error code', () => {
      expect(subject).to.have.property('code').equal(code)
    })

    it('should set error message', () => {
      expect(subject)
        .to.have.property('message')
        .match(/^The "path" argument must be of type string\. Received .+?$/s)
    })

    it('should set error name', () => {
      expect(subject).to.have.property('name').equal(`TypeError [${code}]`)
    })
  })

  describe('#determineSpecificType', () => {
    it('should detect bigint', () => {
      // Arrange
      const value: bigint = faker.datatype.bigInt(13)
      const expected: string = `type bigint (${inspect(value, {
        colors: false
      })})`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect boolean', () => {
      // Arrange
      const value: unknown = faker.datatype.boolean()
      const expected: string = `type boolean (${value})`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect function', () => {
      // Arrange
      const value: unknown = vi.fn()
      const expected: string = 'function spy'

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect instance object', () => {
      // Arrange
      const value: unknown = faker.datatype.datetime()
      const expected: string = 'an instance of Date'

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect null', () => {
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(null)).to.equal('null')
    })

    it('should detect number', () => {
      // Arrange
      const value: unknown = faker.datatype.number(13)
      const expected: string = `type number (${value})`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect string', () => {
      // Arrange
      const value: unknown = faker.datatype.string(30)
      const inspected: string = inspect(value, { colors: false })
      const expected: string = `type string (${inspected.slice(0, 25)}...)`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect symbol', () => {
      // Arrange
      const value: unknown = Symbol('pathe')
      const expected: string = `type symbol (${inspect(value, {
        colors: false
      })})`

      // Act + Expect
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(value)).to.equal(expected)
    })

    it('should detect undefined', () => {
      // @ts-expect-error ts(2445)
      expect(subject.determineSpecificType(undefined)).to.equal('undefined')
    })
  })
})
