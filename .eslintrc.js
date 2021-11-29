module.exports = {
  root: true,

  env: {
    node: true,
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],

  plugins: [
    'react',
  ],

  rules: {
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-unused-vars": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'never'],
    "indent": ["error", 2],
    'array-bracket-newline': ['off', 'consistent'],
    'array-element-newline': ['off', {
      multiline: true,
      minItems: 3, 
    }],
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    camelcase: ['error', {
      properties: 'always',
      ignoreDestructuring: true, 
    }],
    'eol-last': ['error', 'always'],
    'function-call-argument-newline': ['off', 'consistent'],
    'func-call-spacing': ['error', 'never'],
    'newline-before-return': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': ['error'],
    'no-multiple-empty-lines': ['error', {
      max: 2,
      maxBOF: 0,
      maxEOF: 0, 
    }],
    'no-spaced-func': 'error',
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': ['error', {
      ObjectExpression: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
      ObjectPattern: {
        minProperties: 4,
        multiline: true,
        consistent: true,
      },
      ImportDeclaration: {
        minProperties: 2,
        multiline: true,
        consistent: true,
      },
      ExportDeclaration: {
        minProperties: 2,
        multiline: true,
        consistent: true,
      },
    }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    'object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false,
    }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    'template-tag-spacing': ['error', 'always'],
  },
}
