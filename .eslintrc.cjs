/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    "plugin:import/recommended",
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".ts"],
      },
    },
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-this-alias": "off",
    "vue/no-reserved-component-names": "off",
    "prefer-const": "error",
    "prettier/prettier": ["error", { endOfLine: "crlf" }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
          "object",
          "type",
        ],
        alphabetize: {
          order: "asc", // 'ignore', 'asc', 'desc'
          caseInsensitive: true,
        },
        // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
      },
    ],
  },
  ignorePatterns: ["**/__tests__/**"],
};
