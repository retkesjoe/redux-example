const OfflinePlugin = require("offline-plugin");

const offline = new OfflinePlugin({
  relativePaths: false,
  publicPath: "/",
  safeToUseOptionalCaches: true,
  AppCache: false,
  autoUpdate: true,
  responseStrategy: "network-first",
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
