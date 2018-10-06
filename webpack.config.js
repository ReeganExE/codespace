const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const Copy = require('copy-webpack-plugin');
const Write = require('write-file-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackExtensionManifestPlugin = require('webpack-extension-manifest-plugin');
const prepareManifest = require('fill-tpl');

const { env } = process;
const DEV = env.NODE_ENV === 'development';

if (!env.BITBUCKET_ADDR || !env.BITBUCKET_ADDR.startsWith('http')) {
  console.error('BITBUCKET_ADDR is not defined or not a valid address.'); // eslint-disable-line no-console
  process.exit(1);
}

const strManifest = fs.readFileSync('./src/manifest.json');
const manifest = JSON.parse(prepareManifest(strManifest).with(process.env));

const pkg = {
  author: env.npm_package_author_name,
  description: env.npm_package_description,
  version: env.npm_package_version
};

const cssLoader = () => {
  const css = {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: 'ninhdeptrai.com-[hash:base64:6]',
      minimize: DEV ? false : { discardComments: { removeAll: true } }
    }
  };

  return ['style-loader', css];
};


const options = {
  mode: env.NODE_ENV,
  entry: {
    background: './src/index.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: cssLoader()
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      'process.env.BITBUCKET_ADDR': JSON.stringify(env.BITBUCKET_ADDR)
    }),
    new WebpackExtensionManifestPlugin({
      config: {
        base: manifest,
        extend: pkg
      }
    }),
    new Copy([{ from: './icon.png' }])
  ].concat(DEV ? [new Write()] : []),
  devtool: DEV ? 'cheap-module-eval-source-map' : undefined,
  optimization: optimization()
};


function optimization() {
  if (DEV) {
    return;
  }

  return {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          compress: true,
          output: {
            comments: false,
            beautify: false
          },
          safari10: true
        }
      })
    ]
  };
}

module.exports = options;
