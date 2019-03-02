const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const ForkChecker = require("fork-ts-checker-webpack-plugin");

const manifest = require("../client/assets/static/manifest");
const { env, paths, useDebugSymbols } = require("./config");
const { resolveAbsolute, generatePublic } = require("./util");
const loaders = require("./webpack/loaders");

module.exports = {
  devtool: useDebugSymbols ? "cheap-module-eval-source-map" : undefined,
  stats: {
    colors: true,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false,
    children: false,
    modules: false,
    reasons: false,
    warnings: true,
    assets: false,
    version: false
  },
  entry: {
    app: [resolveAbsolute(paths.indexTs)]
  },
  output: {
    path: resolveAbsolute(paths.build),
    crossOriginLoading: "anonymous",
    publicPath: paths.public
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    modules: ["node_modules", resolveAbsolute(paths.app)]
  },
  module: {
    strictExportPresence: true,
    rules: [
      { parser: { requireEnsure: false } },
      {
        test: /\.tsx?$/,
        use: loaders.ts
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        use: "file-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg|webm)$/i,
        use: "url-loader"
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /moment[\\\/]locale$/,
      /^\.\/(de|hu|pt|es|fr|ja|ru|pl|zh-hk)/
    ),
    new CopyPlugin([{ from: paths.static }]),
    new HtmlPlugin({
      inject: false,
      minify: null,
      template: paths.indexHtml,
      publicPath: paths.public,
      baseHref: undefined,
      meta: [
        {
          name: "description",
          content: manifest.description
        }
      ],
      title: manifest.name
    }),
    new ForkChecker({
      tslint: true,
      async: env.isDev,
      logger: {
        info() {},
        warn: console.warn,
        error: console.error
      },
      workers: Math.max(1, require("os").cpus().length / 2 - 1)
    }),
    new webpack.EnvironmentPlugin({
      APP_CONTEXT: generatePublic(process.env.NODE_ENV)
    })
  ]
};
