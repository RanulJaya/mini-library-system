const  express = require('express');
const app = express()
const port = 8080
const requestMiddleware  = require('./src/public/middleware/middleware.js')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs');

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json()) // for parsing application/json
app.use(express.text())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'text/html'}))
app.use(bodyparser.text({type: 'application/javascript'}))


app.get('/list', (req, res) => {

// read the file and send it to the link mentioned
    fs.readFile('src/public/data/fictitious_books.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    res.send(data)
    })
})

app.use(requestMiddleware({opt1 : path.join(__dirname, 'dist')}))

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'books.html'))

    
})


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})