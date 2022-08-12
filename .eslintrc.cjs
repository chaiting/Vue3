/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "prefer-const": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "vue/no-reserved-component-names": "off",
    "@typescript-eslint/no-empty-function": "off",
  },
  ignorePatterns: ["**/__tests__/**", "**/server/**"],
};
