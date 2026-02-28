/** @type {import("stylelint").Config} */
export default {
  extends: [
    // SCSS rules
    "stylelint-config-standard-scss",

    // CSS Modules rules
    "stylelint-config-css-modules",

    // Alphabetical ordering rules
    "stylelint-config-alphabetical-order",

    // Disable rules conflicting with Prettier
    "stylelint-config-prettier-scss",
  ],

  rules: {
    // Allow unknown at-rules
    "at-rule-no-unknown": null,

    // Disable custom property naming pattern enforcement
    "custom-property-pattern": null,

    // Disable mixin naming pattern enforcement for SCSS
    "scss/at-mixin-pattern": null,

    // Allow unknown at-rules in SCSS
    "scss/at-rule-no-unknown": null,

    // Allow duplicate mixins in SCSS
    "scss/no-duplicate-mixins": null,
  },
};
