 const path = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');

 module.exports = {
   entry: {
     app: './public/script/main.js',
   },
   plugins: [
     new HtmlWebpackPlugin({
       title: 'Production',
     }),
   ],
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },

     devServer: {
       static: {
         directory: path.join(__dirname, 'dist'),
       },
       compress: true,
       port: 8080,
       setupMiddlewares: (middlewares, devServer) => {
   
       devServer.app.get('/list', (req, res) => {
         fs.readFile('public/data/fictitious_books.json', 'utf8', (err, data) => {
           if (err) {
             console.error('Error reading file:', err);
             return;
           }
           res.send(data)
         })
       })
   
       devServer.app.get('/books', (req, res) => {
         res.sendFile(path.join(__dirname, 'dist', 'books.html'))
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
         template: "./public/components/homepage.html"
       }),
       new HtmlWebpackPlugin({
         filename: "books.html",
         template: "./public/components/books.html"
       }),
       new MiniCssExtractPlugin({ 
         filename: "style.css"
       })
     ]
 };