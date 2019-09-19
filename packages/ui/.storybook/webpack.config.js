const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loaders: ['file-loader'],
      }
    ]
  }
};