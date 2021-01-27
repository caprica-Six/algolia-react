/* eslint-disable import/no-commonjs */
const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };
    // config.module.rules.push({
    //   test: /\.css$/,
    //   loader: ['style-loader', 'css-loader', 'sass-loader'],
    // });
    if (config.resolve.alias) {
      delete config.resolve.alias.react;
      delete config.resolve.alias['react-dom'];
    }
    return config;
  },
};
