import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import jseslint from "@eslint/js";
import nexteslint from "@next/eslint-plugin-next";
import tanstackqueryeslint from "@tanstack/eslint-plugin-query";
import linguieslint from "eslint-plugin-lingui";
import perfectionisteslint from "eslint-plugin-perfectionist";
import reacteslint from "eslint-plugin-react";
import reacthookseslint from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

const files = {
  ignored: ["build/", "node_modules/", "src/common/apis/"],
  js: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],
  ts: ["**/*.ts", "**/*.cts", "**/*.mts", "**/*.tsx"],
  tsproject: [
    "next-env.d.ts",
    "build/types/**/*.ts",
    "src/**/*.js",
    "src/**/*.cjs",
    "src/**/*.mjs",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.cts",
    "src/**/*.mts",
    "src/**/*.tsx",
  ],
};

export default defineConfig(
  // Global ignores
  globalIgnores(files.ignored),

  // JavaScript support
  {
    files: files.js,

    languageOptions: {
      globals: {
        // Support browser globals
        ...globals.browser,

        // Support node globals
        ...globals.node,
      },

      parserOptions: {
        ecmaFeatures: {
          // Support JSX syntax
          jsx: true,
        },

        // Allow ESM syntax
        sourceType: "module",
      },
    },
  },

  // TypeScript support
  [
    {
      files: files.ts,

      languageOptions: {
        globals: {
          // Support browser globals
          ...globals.browser,

          // Support node globals
          ...globals.node,
        },

        parser: tseslint.parser,

        parserOptions: {
          ecmaFeatures: {
            // Support JSX syntax
            jsx: true,
          },

          // Allow ESM syntax
          sourceType: "module",
        },
      },
    },
    {
      files: files.tsproject,

      languageOptions: {
        parserOptions: {
          // Use project service to build type information
          // Needed for type-aware linting
          projectService: true,

          // Set the root directory of the project
          // Needed for type-aware linting
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  ],

  // JavaScript rules
  {
    extends: [jseslint.configs.recommended],

    files: files.js,

    rules: {
      // Allow empty block statements
      "no-empty": "off",

      // Allow empty destructuring patterns
      "no-empty-pattern": "off",
    },
  },

  // TypeScript rules
  [
    {
      extends: [tseslint.configs.recommended, tseslint.configs.stylistic],

      files: files.ts,

      plugins: {
        "@typescript-eslint": tseslint.plugin,
      },
    },
    {
      extends: [
        tseslint.configs.recommendedTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],

      files: files.tsproject,

      rules: {
        // Allow promises in callbacks
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],

        // Allow nullish coalescing operator for primitive types
        "@typescript-eslint/prefer-nullish-coalescing": [
          "error",
          {
            ignorePrimitives: true,
          },
        ],

        // Allow async functions without await
        "@typescript-eslint/require-await": "off",

        // Skip checking whether static methods are bound
        "@typescript-eslint/unbound-method": [
          "error",
          {
            ignoreStatic: true,
          },
        ],
      },
    },
    {
      files: files.ts,

      rules: {
        // Use objects instead of records for empty types
        "@typescript-eslint/consistent-indexed-object-style": [
          "error",
          "index-signature",
        ],

        // Use types instead of interfaces
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],

        // Use type imports
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            disallowTypeAnnotations: false,
          },
        ],

        // Allow namespaces
        "@typescript-eslint/no-namespace": "off",

        // Allow some unused variables
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            args: "none",
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],

  // Perfectionist rules
  {
    extends: [
      // This config already enables the plugin
      perfectionisteslint.configs["recommended-natural"],
    ],

    files: [...files.js, ...files.ts],

    rules: {
      // Don't sort module members
      "perfectionist/sort-modules": "off",
    },
  },

  // React rules
  {
    extends: [
      reacteslint.configs.flat.recommended,
      reacteslint.configs.flat["jsx-runtime"],
      reacthookseslint.configs.flat.recommended,
    ],

    files: [...files.js, ...files.ts],

    plugins: {
      react: reacteslint,
      "react-hooks": reacthookseslint,
    },

    rules: {
      // Don't check hook dependencies
      "react-hooks/exhaustive-deps": "off",

      // Allow mutating values returned from hooks
      "react-hooks/immutability": "off",

      // Don't check manual memoization preservation by React Compiler
      "react-hooks/preserve-manual-memoization": "off",
    },

    settings: {
      react: {
        // Automatically detect React version
        version: "detect",
      },

      "react-hooks": {
        // Lint custom hooks
        additionalEffectHooks:
          "(useDeepCompareEffect|useDeepCompareCallback|useDeepCompareMemo|useDeepCompareImperativeHandle|useDeepCompareLayoutEffect)",
      },
    },
  },

  // Next.js rules
  {
    extends: [nexteslint.configs.recommended],

    files: [...files.js, ...files.ts],
  },

  // Lingui rules
  {
    extends: [linguieslint.configs["flat/recommended"]],

    files: [...files.js, ...files.ts],

    plugins: {
      lingui: linguieslint,
    },
  },

  // TanStack Query rules
  {
    extends: [tanstackqueryeslint.configs["flat/recommended"]],

    files: [...files.js, ...files.ts],

    plugins: {
      "@tanstack/query": tanstackqueryeslint,
    },
  },
);
