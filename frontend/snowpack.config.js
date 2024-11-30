// snowpack.config.js
module.exports = {
  mount: {
    src: "/src/",
    public: "/",
  },
  plugins: ["@snowpack/plugin-babel", "@snowpack/plugin-postcss"],
  devOptions: {
    open: "browser", // Optional: set to 'browser' if you want to auto-open in browser
  },
};
