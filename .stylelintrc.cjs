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
    'prettier/prettier': true,
    'selector-class-pattern': [
      '^([a-z][a-zA-Z0-9]*)([-__]+[a-zA-Z0-9]+)*$',
      {
        message: 'Expected class selector to be kebab-case'
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'deep']
      }
    ],
  }
};
