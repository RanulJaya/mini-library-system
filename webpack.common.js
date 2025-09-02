const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require('fs');
const json = require('./src/public/data/fictitious_books.json');
const  urlencoded = require('express');
const bodyparser = require('body-parser')

// export modules
module.exports = {
  // set the mode
   mode: "development",
  //  where the entry point to the website are
   entry: {
     app: './src/public/script/main.js',
     books: './src/public/script/bundle.js'
   },
  //  plugin for the prod environment
   plugins: [
       new HtmlWebpackPlugin({
        title: 'Production',
   })],
  //  set the files of the bundlers
   output: {
     filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
     clean: true,
   },
  //  run the server middleware
     devServer: {
       static: {
         directory: path.join(__dirname, 'dist'),
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
        
      //  get the list of the json format
       devServer.app.get('/list', (req, res) => {
        // read the file and send it to the link mentioned
         fs.readFile('src/public/data/fictitious_books.json', 'utf8', (err, data) => {
           if (err) {
             console.error('Error reading file:', err);
             return;
           }
           res.send(data)
         })
       })
       
      //  website link sent from the html
       devServer.app.get('/books', (req, res) => {
         res.sendFile(path.join(__dirname, 'dist', 'books.html'))
       })

      //  post request from the user
       devServer.app.post('/api', (req, res) => {
        // read the file, stringify it, write the file and sync the changes
        fs.readFile('src/public/data/fictitious_books.json', 'utf8', (err, data) => {
           if (err) {
             console.error('Error reading file:', err);
             return;
           }
           
          const dataNewX = Array(JSON.parse(data))

          dataNewX[0].push(req.body)
          
          dataNewX[0][dataNewX[0].length - 1]['id'] = dataNewX[0].length
          dataNewX[0][dataNewX[0].length - 1]['available'] = true

          // res.send(dataNewX)
          const convertToString = JSON.stringify(dataNewX[0], null, "\t")

          fs.writeFileSync('src/public/data/fictitious_books.json', convertToString)
         })
         
        //  redirect back to the page with refresh changes
         res.redirect('/books')
       })

       
       return middlewares;
        }
     },
    //  rules to load in html, resources, css and json
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
         },
       ],
     },
    //  plugins to export files to apropriate names in the /dist path
     plugins: 
      [ 
       new HtmlWebpackPlugin({
         template: "./src/public/components/homepage.html"
       }),
       new HtmlWebpackPlugin({
         filename: "books.html",
         template: "./src/public/components/books.html"
       }),
       new MiniCssExtractPlugin({ 
         filename: "style.css"
       }),
     ]
 };

