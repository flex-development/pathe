/**
 * @file Unit Tests - DriveLetter
 * @module pathe/types/tests/unit-d/DriveLetter
 */

import type * as TestSubject from '#types/drive-letter'
import type { PosixDelimiter } from '@flex-development/pathe'

describe('unit-d:types/DriveLetter', () => {
  it('should extract `${Letter}${PosixDelimiter}`', () => {
    expectTypeOf<TestSubject.default>()
      .extract<`${TestSubject.Letter}${PosixDelimiter}`>()
      .not.toBeNever()
  })

  it('should extract `${Uppercase<Letter>}${PosixDelimiter}`', () => {
    expectTypeOf<TestSubject.default>()
      .extract<`${Uppercase<TestSubject.Letter>}${PosixDelimiter}`>()
      .not.toBeNever()
  })

  describe('Letter', () => {
    it('should extract "a"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'a'>().not.toBeNever()
    })

    it('should extract "b"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'b'>().not.toBeNever()
    })

    it('should extract "c"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'c'>().not.toBeNever()
    })

    it('should extract "d"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'d'>().not.toBeNever()
    })

    it('should extract "e"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'e'>().not.toBeNever()
    })

    it('should extract "f"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'f'>().not.toBeNever()
    })

    it('should extract "g"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'g'>().not.toBeNever()
    })

    it('should extract "h"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'h'>().not.toBeNever()
    })

    it('should extract "i"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'i'>().not.toBeNever()
    })

    it('should extract "j"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'j'>().not.toBeNever()
    })

    it('should extract "k"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'k'>().not.toBeNever()
    })

    it('should extract "l"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'l'>().not.toBeNever()
    })

    it('should extract "m"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'m'>().not.toBeNever()
    })

    it('should extract "n"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'n'>().not.toBeNever()
    })

    it('should extract "o"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'o'>().not.toBeNever()
    })

    it('should extract "p"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'p'>().not.toBeNever()
    })

    it('should extract "q"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'q'>().not.toBeNever()
    })

    it('should extract "r"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'r'>().not.toBeNever()
    })

    it('should extract "s"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'s'>().not.toBeNever()
    })

    it('should extract "t"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'t'>().not.toBeNever()
    })

    it('should extract "u"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'u'>().not.toBeNever()
    })

    it('should extract "v"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'v'>().not.toBeNever()
    })

    it('should extract "w"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'w'>().not.toBeNever()
    })

    it('should extract "x"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'x'>().not.toBeNever()
    })

    it('should extract "y"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'y'>().not.toBeNever()
    })

    it('should extract "z"', () => {
      expectTypeOf<TestSubject.Letter>().extract<'z'>().not.toBeNever()
    })
  })
})
