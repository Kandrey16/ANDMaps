import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import prettier from 'eslint-config-prettier'

export default [
	js.configs.recommended,

	...tseslint.configs.recommended,
	...tseslint.configs.strict,

	{
		ignores: ['dist', 'build', 'node_modules']
	},

	{
		files: ['**/*.{ts,tsx}'],

		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true
				}
			}
		},

		plugins: {
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
			import: importPlugin,
			'simple-import-sort': simpleImportSort
		},

		settings: {
			react: {
				version: 'detect'
			}
		},

		rules: {
			// =========================
			// REACT
			// =========================
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',

			// =========================
			// REACT HOOKS (критично)
			// =========================
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// =========================
			// IMPORTS
			// =========================
			'import/first': 'error',
			'import/newline-after-import': 'error',
			'import/no-duplicates': 'error',

			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',

			// =========================
			// TYPESCRIPT
			// =========================
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',

			// =========================
			// CODE QUALITY
			// =========================
			'no-console': ['warn', { allow: ['warn', 'error'] }],

			'no-debugger': 'error',
			'no-var': 'error',
			'prefer-const': 'error',

			// =========================
			// ACCESSIBILITY
			// =========================
			'jsx-a11y/alt-text': 'warn',
			'jsx-a11y/no-autofocus': 'warn'
		}
	},

	// Prettier должен идти последним
	prettier
]
