const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';

const config = {
  // configurations
  devtool: 'eval-cheap-source-map',
  mode: devMode ? 'development' : 'production',

  // input code
  entry: './src/js/app.ts',
  // output
  output: {
      filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html' },
        { from: 'src/css', to: 'css/' },
        // { from: "src/images", to: "images/" },
      ],
    }),
  ],

  // server details
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  optimization: {
    minimize: !devMode,
  },
};

module.exports = config;
