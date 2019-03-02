const { useDebugSymbols } = require("../config");

const css = [
  {
    loader: "css-loader",
    options: { sourceMap: useDebugSymbols, importLoaders: 1 }
  }
];

const scss = css.concat([
  "resolve-url-loader",
  {
    loader: "sass-loader",
    options: { sourceMap: useDebugSymbols }
  }
]);

const ts = [
  {
    loader: "babel-loader",
    options: {
      cacheDirectory: true
    }
  },
  {
    loader: "ts-loader",
    options: {
      configFile: "tsconfig.dev.json",
      transpileOnly: true,
      experimentalWatchApi: true
    }
  }
];

module.exports = {
  css,
  scss,
  ts
};
