/**
 * @file Fixtures - env
 * @module fixtures/env
 */

import process from '#internal/process'

/**
 * Environment variables.
 *
 * @const {Record<string, string>} env
 */
const env: Record<string, string> = {
  '=P:': 'P:' + process.cwd(),
  '=Q:': 'Q:' + process.cwd(),
  '=R:': 'R:' + process.cwd(),
  '=Z:': 'A:' + process.cwd()
}

export default env
