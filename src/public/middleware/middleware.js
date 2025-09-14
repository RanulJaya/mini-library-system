module.exports  = function (option){
    return function (req, res, next) {
        const fs = require('fs');

        if(req.url === '/api'){
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

            res.redirect('/books')

        }

        next()

    }
}

