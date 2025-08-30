const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../../webpack.config');
const  urlencoded = require('express');

const compiler = Webpack(webpackConfig);
const devServerOptions = { ...webpackConfig.devServer, open: false };
const server = new WebpackDevServer(devServerOptions, compiler);
const bodyparser = require('body-parser')


const runServer = async () => {
  console.log('Starting server...');
  await server.start();


    // server.app.use(urlencoded.)
  // server.app.use(urlencoded.json())
  // server.app.use(urlencoded({extended: true}))

    server.app.use(urlencoded.static('dist'))
    server.app.use(urlencoded.json()) // for parsing application/json
    server.app.use(urlencoded.text())
    server.app.use(urlencoded.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    server.app.use(bodyparser.text({type: 'text/html'}))
    server.app.use(bodyparser.text({type: 'application/javascript'}))




  async function loadData(res){
    return new Promise(() => {
      setTimeout(() => {    
        res.redirect('/')
      },2000)
    })
  }

  server.app.post('/list', async(req, res) => {
    // console.log()
    // req.json()
    res.send(req.body)
  })

  server.app.post('/testing', (req, res) => {
 

    if(req.is('text/html')){
      res.send(req.body)
    }

    else if(req.is('application/javascript')){

    fs.write('public/data/fictitious_books.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
      res.send(data)
    })
    }
    
  })

};


runServer();




