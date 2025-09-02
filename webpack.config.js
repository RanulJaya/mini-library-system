// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const json = require('./src/public/data/fictitious_books.json');
const  urlencoded = require('express');
const bodyparser = require('body-parser')



module.exports = {
  mode: "development",
  entry: {
    index: './src/public/script/main.js',
    books: './src/public/script/bundle.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/public'),
    },
    compress: true,
    port: 8080,
    setupMiddlewares: (middlewares, devServer) => {

    
    devServer.app.use(urlencoded.static('dist'))
    devServer.app.use(urlencoded.json()) // for parsing application/json
    devServer.app.use(urlencoded.text())
    devServer.app.use(urlencoded.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    devServer.app.use(bodyparser.text({type: 'text/html'}))
    devServer.app.use(bodyparser.text({type: 'application/javascript'}))

    devServer.app.get('/list', (req, res) => {
      fs.readFile(json, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
        res.send(data)
      })
    })

    devServer.app.get('/books', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'books.html'))
    })


    return middlewares;
     }
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/components/homepage.html"
    }),
    new HtmlWebpackPlugin({
      filename: "books.html",
      template: "./src/public/components/books.html"
    }),
    new MiniCssExtractPlugin({ 
      filename: "style.css"
    })
  ]
};