module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'prettier', 'plugin:jsdoc/recommended'],
  plugins: ['jsdoc', 'jest'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'jsdoc/require-param-description': 0,
    'jsdoc/require-property-description': 0,
    'jsdoc/require-returns-description': 0,
    'jsdoc/check-tag-names': [1, { definedTags: ['swagger'] }],
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
};
