const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
//require('dotenv').config(); i think this is redunant to dotenv-webpack
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// Make sure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  node: {
    __dirname: true, // Enable __dirname
    __filename: true, // Enable __filename
    global: true, // Enable global
  },
  output: {
    path: resolveApp('dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].chunk.js',
    publicPath: '/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json',
  },
  devServer: {
    host: '127.0.0.1',
    compress: true,
    port: 8000,
    historyApiFallback: true,
  },
  externals: {
    config: JSON.stringify({
      file_reader: 'FileReader',
      api_url: '',
      imageapi_url: '',
      public_path: '/',
    }),
  },
  resolve: {
    extensions: ['.*', '.js', '.jsx'],
    alias: {
      Assets: path.resolve(__dirname, 'src/assets/'),
    },
    modules: [path.join(__dirname, 'js/helpers'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {},
          mangle: true,
        },
      }),
    ],
  },
  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
  },
  plugins: [
    new Dotenv(), 
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      favicon: './public/favicon.png',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['css/*.*', 'js/*.*', 'fonts/*.*', 'images/*.*'],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],
  devtool: 'eval-source-map',

};
