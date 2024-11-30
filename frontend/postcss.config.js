// postcss.config.js
module.exports = {
  plugins: {
    "postcss-preset-env": {
      stage: 3, // Enable stage 3 features like `:is()` and `:where()`
    },
  },
};
