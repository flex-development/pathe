/**
 * @file Test Setup - env
 * @module tests/setup/env
 */

import env from '#fixtures/env'
import process from '#internal/process'

afterAll(() => {
  for (const key of Object.keys(env)) delete process.env[key]
})

beforeAll(() => {
  process.env = { ...process.env, ...env }
})
