const OfflinePlugin = require("offline-plugin");

const { env } = require("../config");

const offline = new OfflinePlugin({
  relativePaths: false,
  publicPath: "/",
  safeToUseOptionalCaches: true,
  AppCache: false,
  autoUpdate: true,
  responseStrategy: env.isDev ? "network-first" : "cache-first",
  caches: {
    main: [":rest:"],
    additional: ["*.chunk.js"]
  },
  cacheMaps: [
    {
      match: function(requestUrl) {
        return new URL("/", location);
      },
      requestTypes: ["navigate"]
    }
  ]
});

module.exports = {
  offline
};
