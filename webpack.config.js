const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  plugins: [
    new HtmlWebpackPlugin({ template: './docs/template.html' })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '.css'],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'docs'),
    hot: true,              // enables hot module replacement (HMR)
    watchFiles: ['src/**/*', 'docs/template.html'], // ensures CSS/template changes trigger reload
    port: 3000,
  },
  devtool: 'source-map',
};
