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
  ts
};
