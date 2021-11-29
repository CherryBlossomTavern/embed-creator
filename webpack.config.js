/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = () => ({
  plugins : [
    new HtmlWebpackPlugin({
      template: './src/base/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|webp|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'scss': path.join(__dirname, 'src', 'scss'),
      'assets': path.join(__dirname, 'src', 'assets'),
      '~mixins': path.join(__dirname, 'src', 'scss', 'mixins'),
    },
    extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
  },
  entry: {
    app: path.resolve(__dirname, 'src', 'index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: "[name].bundle.js",
  },

  target: "web",
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

  devServer: {
    port: Number(process.env.PORT) || 6969,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
})
