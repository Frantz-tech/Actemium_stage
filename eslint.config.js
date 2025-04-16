import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
  {
    files: ['**/*.{js,cjs,mjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      js,
      prettier: prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      eqeqeq: 'error',
      'prettier/prettier': 'warn', // active prettier comme règle ESLint
    },
  },
]);
