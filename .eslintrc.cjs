/**
 * @file ESLint Configuration - Root
 * @module config/eslint
 * @see https://eslint.org/docs/user-guide/configuring
 */

/**
 * @type {import('eslint').Linter.Config}
 * @const config - ESLint configuration object
 */
const config = {
  root: true,
  extends: ['./.eslintrc.base.cjs'],
  overrides: [
    ...require('./.eslintrc.base.cjs').overrides,
    {
      files: ['./src/lib/format.ts', './src/lib/resolve.ts'],
      rules: {
        '@typescript-eslint/prefer-nullish-coalescing': 0
      }
    },
    {
      files: ['./src/pathe.ts'],
      rules: {
        '@typescript-eslint/unbound-method': 0
      }
    }
  ]
}

module.exports = config
