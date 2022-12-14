module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
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
    extraFileExtensions: ['.vue', '.js', '.jsx', '.ts', '.tsx', '.d.ts']
  },
  settings: {
    'import/extensions': ['.vue', '.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx', '.d.ts']
      }
    }
  },
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    // vue
    'vue/multi-word-component-names': 'off',
    // import
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-cycle': 'off',
    // typescript
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
