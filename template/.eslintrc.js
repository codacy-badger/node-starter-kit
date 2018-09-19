// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: [
    'airbnb-base',
    'plugin:unicorn/recommended',
  ],
  plugins: [
    'unicorn',
  ],
  // add your custom rules here
  rules: {
    'import/prefer-default-export': 'off',

    // override unicorn rules
    'unicorn/explicit-length-check': 'off',

    // allow debugger during development
    'max-len': 'off',
    'key-spacing': ['warn', { align: 'value' }],
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'func-names': 'error',
    complexity: ['error', 5],
    'no-mixed-operators': ['warn'],
    'no-debugger': ['error'],
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.js?(x)',
        '**/?(*.)+(spec|test).js?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
