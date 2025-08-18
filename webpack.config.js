// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/app.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./public/homepage.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/homepage.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: "style-loader"
      },
      {
        test: /\.css$/i,
        use: "css-loader"
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
