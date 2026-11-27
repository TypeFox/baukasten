import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
    globalIgnores(['dist', 'storybook-static', 'coverage']),
    js.configs.recommended,
    tseslint.configs.recommended,
    storybook.configs['flat/recommended'],
    {
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: { 'react-hooks': reactHooks },
        rules: {
            // Only the two classic hook rules.  The plugin's `recommended` preset has
            // since grown the React Compiler rules (refs, set-state-in-effect, ...),
            // which this code base has not been written against.
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        // Storybook CSF3 render functions use hooks but are not named components.
        // Disabling rules-of-hooks here is safe because Storybook treats render()
        // as a React component at runtime.
        files: ['**/*.stories.tsx', '**/*.stories.ts'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
        },
    },
    prettier,
);
