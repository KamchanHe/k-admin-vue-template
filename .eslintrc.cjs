module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tsconfig.eslint.json'
    ],
    extraFileExtensions: ['.vue', '.ts', '.d.ts', '.tsx']
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-param-reassign': 'off',
    // vue
    'vue/multi-word-component-names': 'off',
    // import
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-cycle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ]
  }
};
