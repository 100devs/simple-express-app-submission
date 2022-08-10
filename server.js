// importing dependencies

const { json } = require('express')
const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 8000


app.get('/', express.static('public'))


// checking the key

// app.use((req, res, next) => {
//     if (req.query.key === '1234') {
//         next()
//     } else {
//         res.status(401).send('Unauthorized')
//     }
// })

app.post('/movies', (req, res) => {
    fs.readFile('movies.json', 'utf-8', (err, data) => {
        const parseData = JSON.parse(data)
        parseData.push({
            name: req.query.name,
            year: req.query.year
        })
        fs.writeFile('movies.json', JSON.stringify(parseData), (err) => {
            res.status(201).json({
                message: 'NEW MOVIE IS ADDED SUCCESSFULLY'
            })
        })
    })
})

// getting the movies from movies.json file

app.get('/movies', (req, res) => {
    fs.readFile('movies.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json({
                message: 'ERROR'
            })
        } else {
            // res.send(JSON.parse(data))
            res.status(200).json({
                message: 'SUCCESS',
                data: JSON.parse(data)
            })
        }
    })
})


// running the server 
app.listen(process.env.PORT || PORT, () => console.log(`server is running on port ${PORT}`))