/**
 * @file Plugins - chaiPath
 * @module tests/plugins/chaiPath
 */

import type Chai from 'chai'
import path from 'node:path'

export default plugin

/**
 * Chai assertion plugin for the Node.js [path][node-path] API.
 *
 * [node-path]: https://nodejs.org/api/path.html
 *
 * @see {@linkcode Chai.ChaiStatic}
 * @see {@linkcode Chai.ChaiUtils}
 *
 * @param {ChaiStatic} chai
 *  `chai` export
 * @param {Chai.ChaiUtils} utils
 *  `chai` utilities
 * @return {undefined}
 */
function plugin(chai: Chai.ChaiStatic, utils: Chai.ChaiUtils): undefined {
  utils.addMethod(chai.Assertion.prototype, extname.name, extname)

  return void 0

  /**
   * Assert the return value of {@linkcode path.extname}.
   *
   * @this {Chai.Assertion}
   *
   * @param {unknown} expected
   *  Expected file extension
   * @return {undefined}
   */
  function extname(this: Chai.Assertion, expected: unknown): undefined {
    /**
     * Subject of assertion.
     *
     * @const {string} subject
     */
    const subject: string = utils.flag(this, 'object')

    /**
     * File extension.
     *
     * @const {string} ext
     */
    const actual: string = path.extname(subject)

    return void this.assert(
      actual === expected,
      'expected extname of #{this} to be #{exp} but got #{act}',
      'expected extname of #{this} to not be #{act}',
      expected,
      actual
    )
  }
}
