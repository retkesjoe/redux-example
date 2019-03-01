const path = require("path");
const dotenv = require("dotenv");

const { parseInt, resolveAbsolute, generatePublic } = require("./util");

dotenv.config();

// Env
const isDev = process.env.NODE_ENV === "development";
const env = {
  isDev
};

// Paths
const app = "./store";
const build = "./wwwroot";
const packageJson = resolveAbsolute("package.json");
const paths = {
  app,
  build,
  static: path.join(app, "assets", "static"),
  indexTs: path.join(app, "index.tsx"),
  indexHtml: path.join(app, "assets", "index.ejs"),
  packageJson,
  public: generatePublic(process.env.NODE_ENV)
};

// Dev server
const port = parseInt(process.env.PORT, 3000);
const host = process.env.HOST;
const devServer = {
  port,
  host,
  address: `http://${host}:${port}`
};

module.exports = {
  paths,
  devServer,
  env,
  useDebugSymbols: isDev
};
