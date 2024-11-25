// @ts-check

// based on https://github.com/vercel/next.js/pull/71218#issuecomment-2440754208
import js from '@eslint/js';
import ts from 'typescript-eslint';
import tailwind from 'eslint-plugin-tailwindcss';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import("@typescript-eslint/utils").TSESLint.FlatConfig.ConfigFile} */
const config = [
  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ],
      // "@typescript-eslint/require-await": "off",
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },
  {
    ignores: ['**/**/node_modules', '**/**/.next', '**/**/public' /*, "env.js"*/],
  },
];
export default config;
