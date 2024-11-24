/**
 * @file Test Setup - chai
 * @module tests/setup/chai
 * @see https://chaijs.com
 */

import chaiPath from '#tests/plugins/chai-path'
import chaiString from 'chai-string'
import { chai } from 'vitest'

/**
 * initialize chai plugins.
 *
 * @see https://github.com/onechiporenko/chai-string
 */
chai.use(chaiPath)
chai.use(chaiString)
