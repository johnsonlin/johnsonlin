// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "jl",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "jl",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "comma-dangle": [
        "error",
        "always-multiline"
      ],
      "space-in-parens": [
        "error",
        "never"
      ],
      "space-before-function-paren": [
        "error",
        {
          "anonymous": "never",
          "asyncArrow": "always",
          "named": "never"
        }
      ],
      "padded-blocks": [
        "error",
        {
          "blocks": "never",
          "classes": "never",
          "switches": "never"
        }
      ],
      "lines-between-class-members": [
        "error",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
      "padding-line-between-statements": [
        "error",
        {
          "blankLine": "always",
          "prev": [
            "case",
            "default"
          ],
          "next": "*"
        }
      ],
      "newline-before-return": "error",
      "newline-after-var": [
        "error",
        "always"
      ],
      "sort-imports": [
        "error",
        {
          "ignoreCase": true,
          "ignoreDeclarationSort": true,
          "allowSeparatedGroups": true
        }
      ],
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "parent",
            "sibling",
            "index"
          ],
          "pathGroups": [
            {
              "pattern": "@**/**",
              "group": "builtin",
              "position": "after"
            }
          ],
          "newlines-between": "always",
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
