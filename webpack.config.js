const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    port: 4000,
    hot: true,
    open: false,
    historyApiFallback: true,
    devMiddleware: {
      publicPath: '/',
    },
  },
  entry: {
    renderer: './src/renderer/index.tsx'
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/, /\.test\.tsx?$/],
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.prod.json'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
      filename: 'index.html',
      publicPath: '/',
      inject: true
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/renderer'),
    publicPath: '/',
  },
};
