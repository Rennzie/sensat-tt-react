module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    commonjs: false,
    es6: true,
  },
  globals: {
    browser: true,
  },
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'react', 'prettier', 'react-hooks', 'import'],

  rules: {
    '@typescript-eslint/ban-ts-comment': 'warn',
    'react/prop-types': ['off'],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.tsx'],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['webpack.*', '**/*.d.ts', '.eslintrc.js'],
      },
    ],
    'react/no-multi-comp': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // this is set to prevent errors on UNSAFE_componentWillUpdate which is  depracated and needs to be removed ASAP
    camelcase: 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/prefer-default-export': 'off',

    'jsx-a11y/label-has-associated-control': 'warn',
  },
};
