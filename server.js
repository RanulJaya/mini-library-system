// import { Client } from 'pg'
const  express = require('express');
const app = express()
const port = 8080
const requestMiddleware  = require('./src/public/middleware/middleware.js')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs');
const pgp = require('pg-promise')(/* options */)


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json()) // for parsing application/json
app.use(express.text())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(bodyparser.text({type: 'text/html'}))
app.use(bodyparser.text({type: 'application/javascript'}))


app.get('/list', async(req, res) => {

    const details = require('./src/public/data/serverdetails.json' )
    const db = pgp(details['connectionString'])

    // read the database and send it to the link mentioned
    await db.query('SELECT $1:name FROM $2:name', ['*', 'books']).then(
        (data) => {
            res.send(JSON.stringify(data, null, 4))
        }
    ).finally(db.$pool.end)    
})

app.use(requestMiddleware({opt1 : path.join(__dirname, 'dist')}))

app.get('/books', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'books.html'))
})


app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})