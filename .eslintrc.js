"use strict";

module.exports = {
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "parser": "babel-eslint",
  "rules": {
    "strict": 0
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true,
    "jest": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ]
};
