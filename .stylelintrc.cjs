module.exports = {
  plugins: ['stylelint-prettier'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recess-order',
    'stylelint-config-prettier',
    'stylelint-prettier/recommended'
  ],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.{css,scss}'],
      customSyntax: 'postcss-scss'
    }
  ],
  rules: {
    'prettier/prettier': true
  }
};
