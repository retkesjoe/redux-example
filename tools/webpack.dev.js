const webpack = require("webpack");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const { devServer, paths, useDebugSymbols } = require("./config");

const base = require("./webpack.base");
const loaders = require("./webpack/loaders");

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
    proxy: {
      "/api": {
        target: devServer.apiServer,
        secure: false,
        changeOrigin: true
      }
    },
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
  module: {
    rules: base.module.rules.concat([
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
            options: { sourceMap: useDebugSymbols }
          }
        ].concat(loaders.scss)
      },
      {
        test: /\.css$/,
        use: ["style-loader"].concat(loaders.css)
      }
    ])
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.EnvironmentPlugin({
      API_URL: "https://reqres.in/api"
    })
  ]
});
