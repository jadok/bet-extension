const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: {
    unibet: './src/app/unibet.ts',
    sofascore: './src/app/sofascore.ts',
    background: './src/app/background.ts',
    popup: './src/ui/Popup.tsx',
  },

  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".scss"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.scss$/, use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          },
        }, 'css-loader', 'sass-loader'
      ]}
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
};
