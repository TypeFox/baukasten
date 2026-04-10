module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // Disabled: react-refresh is for app-level HMR, not relevant for a component library.
    'react-refresh/only-export-components': 'off',
  },
  overrides: [
    {
      // Storybook CSF3 render functions use hooks but are not named components.
      // Disabling rules-of-hooks here is safe because Storybook treats render()
      // as a React component at runtime.
      files: ['**/*.stories.tsx', '**/*.stories.ts'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ],
}

