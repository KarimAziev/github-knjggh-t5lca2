module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: ['prettier'],
  plugins: ['babel'],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  }
};
