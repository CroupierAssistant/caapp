const path = require("path");

module.exports = {
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    sourceExts: ["expo"],
    assetExts: ["expo", "png", "jpg"],
  },
  watchFolders: [path.resolve("./node_modules/react-native-vector-icons")],
};