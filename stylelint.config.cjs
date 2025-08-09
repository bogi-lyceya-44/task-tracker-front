module.exports = {
  customSyntax: "postcss-html",

  extends: ["stylelint-config-recommended", "stylelint-config-standard"],

  plugins: ["stylelint-order"],

  rules: {
    "order/properties-alphabetical-order": true,
    "color-no-invalid-hex": true,
    "declaration-block-no-duplicate-properties": true,
    "block-no-empty": true,
  },

  ignoreFiles: ["dist/**", "node_modules/**"],
};
