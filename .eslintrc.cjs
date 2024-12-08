module.exports = {
  env: {
    // Set ES2022 environment
    es2022: true,
  },

  extends: [
    // Use Next.js core web vitals rules
    "next/core-web-vitals",

    // Use recommended eslint rules
    "eslint:recommended",

    // Use recommended typescript-eslint rules
    "plugin:@typescript-eslint/recommended",

    // Use stylistic typescript-eslint rules
    "plugin:@typescript-eslint/stylistic",

    // Use recommended Lingui rules
    "plugin:lingui/recommended",

    // Use recommended perfectionist rules
    "plugin:perfectionist/recommended-alphabetical-legacy",

    // Turn off rules that might conflict with Prettier
    "prettier",
  ],

  overrides: [
    {
      // Apply rules to generated types
      files: ["*.d.ts"],
      rules: {
        // Allow empty object types
        "@typescript-eslint/no-empty-object-type": [
          "error",
          {
            allowObjectTypes: "always",
          },
        ],
      },
    },
  ],

  // Use typescript-eslint parser
  parser: "@typescript-eslint/parser",

  parserOptions: {
    // Allow ES2022 syntax
    sourceType: "module",
  },

  plugins: [
    // Use @typescript-eslint plugin
    "@typescript-eslint",

    // Use perfectionist plugin
    "perfectionist",
  ],

  // Ignore configuration files in directories above this one
  root: true,

  rules: {
    // Use objects instead of records for empty types
    "@typescript-eslint/consistent-indexed-object-style": [
      "error",
      "index-signature",
    ],

    // Use types instead of interfaces
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],

    // Allow anonymous default exports
    "import/no-anonymous-default-export": "off",

    // Allow empty block statements
    "no-empty": "off",

    // Allow empty destructuring patterns
    "no-empty-pattern": "off",
  },
};
