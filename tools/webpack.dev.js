const webpack = require("webpack");

const { devServer, paths } = require("./config");

const base = require("./webpack.base");

module.exports = Object.assign({}, base, {
  mode: "development",
  performance: false,
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    ...base.output,
    pathinfo: false
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: paths.build,
    port: devServer.port,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      children: false,
      modules: false,
      reasons: false,
      warnings: true,
      assets: false,
      version: false
    }
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
});
