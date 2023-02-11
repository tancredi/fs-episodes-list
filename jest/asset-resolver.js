const { basename } = require("path");

module.exports = {
  process: (_, fname) => ({
    code: `module.exports = {
      default: {
        src: "/mock/asset/${basename(fname)}",
        width: 100,
        height: 200
      },
      __esModule: true,
    };`,
  }),
  sync: true,
};
