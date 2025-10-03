module.exports  = function (option){
    return async function (req, res, next) {
        // init parameters for postgres
        const fs = require('fs');
        const pgp = require('pg-promise')(/* options */)

        const details = require('../data/serverdetails.json' )
        const db = pgp(details['connectionString'])
        const getQuery = pgp(details['connectionString'])
        const tableName = 'books'

        if(req.url === '/api'){

            // initialize insert query
            const insertQuery = `INSERT INTO "${tableName}" ("title", "author", "isbn", "available", "genreid", "year")
            VALUES($1, $2, $3, $4, $5, $6)`

            // get query from the table
            await getQuery.query(`SELECT id FROM $1:name WHERE genre = $2`, ["genre", req.body['genre']])
            .then(async(genreData) => {

                if(genreData != '[]'){
                    // insert in new query to books
                    await db.query(insertQuery, [req.body['title'], req.body['author'], req.body['isbn'], true, genreData[0]['id'], req.body['year']])
                    .then((data) => {
                        res.send(data)
                    })
                }

            }).finally(db.$pool.end)
        }

        next()

    }
}

