const appRoot = require("app-root-path");
const path = require("path");

function parseInt(str, fallback) {
  return (str && Number.parseInt(str, 10)) || fallback;
}

function resolveAbsolute(...paths) {
  return path.resolve(appRoot.path, path.join(...paths));
}

function generatePublic(str) {
  var ret = "";
  switch(str){
    case "development":
      ret = "/";
      break;
    default:
      ret = "./";
  }
  return ret;
}

module.exports = {
  parseInt,
  resolveAbsolute,
  generatePublic
};
