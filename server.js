const express = require('express')
const app = express()
const PORT = 3001
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//set EJS as template engine to generate HTML
app.set('view engine', 'ejs')
//urlencoded method tells express to extract data from form and add to body property of request object (req.body)
app.use(express.urlencoded({ extended: true }))
//express's JSON middleware to allow server to accept/read JSON data
app.use(express.json())
//express.static - middleware to make dir accessible to public
app.use(express.static('public'))

let db,
    DB_STRING = process.env.DB_STRING,
    dbName = 'phonebook'

MongoClient.connect(DB_STRING, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName)
        console.log(`Connected to ${dbName} Database`)

        app.listen(process.env.PORT || PORT, () => {
            console.log(`Listening on env port or ${PORT}`)
        })
      
        app.get('/', (req, res) => {
            db.collection('persons').find().toArray()
            .then(results => {
                let date = new Date()
                console.log(date + " GET '/' requested by " + req.hostname)
                res.render('index.ejs', {persons: results})
            })
        })

        app.get('/info', (req, res) => {
            const date = new Date()
            db.collection('persons').find().toArray()
            .then(results => {
                res.send('Phonebook has info for ' + results.length + ' people' + '\n' + date)
            })
        })

        app.get('/api/persons', (req, res) => {
            db.collection('persons').find().toArray()
            .then(results => {
                res.json(results)
            })
        })

        app.get('/api/persons/:_id', (req, res) => {
            const personId = req.params._id
            db.collection('persons').find().toArray()
            .then(results => {
                if ( results.find(x => x['_id'] == personId) ){
                    res.json( results.find(x => x['_id'] == personId ))
                } else {
                    return res.status(400).send('Error 400: Bad Request').end()
                }
            })
        })

        app.delete('/', (req, res) => {
            const personName = req.body.name
            db.collection('persons').deleteOne({ name: personName })
            .then(results => {
                if (results.deletedCount === 0) {
                  // console.log(results)
                    return res.status(400).json('Error 400: Bad Request')
                } else {
                  // console.log(results)
                  console.log(`${personName} has been deleted from phonebook.`)
                  res.status(200).json(`${personName} has been deleted from phonebook.`)
                }
            })
        })

        app.post('/api/persons', (req, res) => {
            db.collection('persons').insertOne({name: req.body.name, homeNumber: req.body.homeNumber})
            .then(results => {
                let name = req.body.name
                console.log(`${name} has been added to phonebook.`)
                res.redirect('/')
            })
        })
    })
    .catch(error => console.error(error))