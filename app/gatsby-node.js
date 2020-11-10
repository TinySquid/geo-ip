// Fixes a Webpack build error when importing react-leaflet because of missing browser environment at build time
exports.onCreateWebpackConfig = ({ stage, rules, loaders, actions }) => {
  switch (stage) {
    case "build-html":
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /react-leaflet/,
              use: [loaders.null()],
            },
          ],
        },
      });
      break;
  }
};
