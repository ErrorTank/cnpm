const path = require("path");
const dotenv = require("dotenv");
const webpack = require("webpack");
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = dotenv.config({path: "./env/dev.env"}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: "development",
  entry: {
    loader: ["@babel/polyfill", "./client/react/loader.jsx"]
  },
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: "/",
    path: path.resolve(__dirname, 'public/bundle'),

  },
  resolve: {
    extensions: [".js", ".jsx", ".styl", ".gql", ".graphql"]
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new AsyncChunkNames(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
      inject: true
    })
    // new webpack.HashedModuleIdsPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'async',
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        },
        vendor: {
          // sync + async chunks
          chunks: 'all',
          name: "vendor",
          // import file path containing node_modules
          test: /node_modules/
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.styl$/,
        use: [
          "style-loader",
          "css-loader",
          "stylus-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map"
};
