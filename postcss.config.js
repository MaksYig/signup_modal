module.exports = {
  syntax: "postcss-scss",
  plugins: [
    require("postcss-mixins"),
    require("postcss-custom-media"),
    require("postcss-import"),
    require("postcss-nested"),
    require("autoprefixer")({
      overrideBrowserslist: [">1%"],
      cascade: false,
    }),
    require("postcss-simple-vars"),
    require("cssnano"),
    // require('postcss-fail-on-warn')
  ],
};
