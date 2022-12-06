/**
 * @file Units Tests - NodeError
 * @module pathe/internal/tests/unit/NodeError
 */

import TestSubject from '../node-error'

describe('unit:internal/NodeError', () => {
  describe('constructor', () => {
    let code: string
    let name: string
    let subject: TestSubject

    beforeEach(() => {
      code = 'ERR_INVALID_ARG_TYPE'
      name = 'TypeError'
      subject = new TestSubject(name, code)
    })

    it('should override error name', () => {
      expect(subject).to.have.property('name').equal(`${name} [${code}]`)
    })

    it('should set error code', () => {
      expect(subject).to.have.property('code').equal(code)
    })
  })
})
