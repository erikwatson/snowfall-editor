import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "development",
  entry: "./src/index.tsx",
  plugins: [
    new HtmlWebpackPlugin({ template: "./assets/template.html" }),
    new CopyPlugin({
      patterns: [{ from: "assets/images", to: "assets" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx", ".css"],
  },
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "docs"),
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, "docs"),
    hot: true,
    watchFiles: ["src/**/*", "assets/**/*"],
    port: 3000,
  },
  devtool: "source-map",
};
