// Require dependencies
const express = require('express') // for easy server connection
const app = express() // to get express to work

const MongoClient = require('mongodb').MongoClient

const cors = require('cors')
const { response } = require('express')
app.use(cors())

require('dotenv').config() // to hide info - npm i dotenv
const PORT = process.env.PORT

// npm i nodemon --save-dev
// Declare database variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'catfoster'

// Connect to MongoDB 
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) // replacing body-parser



// Read (get request)
app.get('/', (request, response) => {
    // response.sendFile(__dirname + '/index.html')
    db.collection('cat-info').find().toArray()
        .then(data => {
            console.log(data)
            let logs = data.map(item => [item.name, item.date])
            console.log(logs)
            response.render('index.ejs', { info: logs }) // render ejs and pass in info
        })
        .catch(error => console.log(error))
})



// Create (post request)
app.post('/api', (request, response) => {
    console.log(`post heard`)
    db.collection('cat-info').insertOne(
        request.body
    )
        .then(result => {
            console.log(result)
            response.redirect('/')
        })
        .catch(error => console.log(error))
})


// Update (put request)
app.put('/updateEntry', (request, response) => {
    console.log(`update requested: ${request.body}`)
    Object.keys(request.body).forEach(key => {
        if (request.body[key] == null || request.body[key] == '') {
            delete request.body[key]
        }
    })
    console.log(request.body)
    db.collection('cat-info').findOneAndUpdate(
        {
            name: request.body.name,
            date: request.body.date  
        },
        { $set: request.body }
    )
        .then(result => {
            console.log(result)
            response.json('Success')
        })
        .catch(error => console.error(error))
    // response.redirect('/')
})


// Delete 
app.delete('/deleteEntry', (request, response) => {
    db.collection('cat-info').deleteOne(
        {
            name: request.body.name,
            date: request.body.date
        }
    )
        .then(result => {
            console.log('Entry deleted')
            response.json('Entry deleted')
        })
        .catch(error => console.error(error))
})


// Set up localhost on PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${process.env.PORT}.`)
})