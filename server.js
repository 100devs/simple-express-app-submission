const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient

require('dotenv').config()
const connectionString = process.env.DB_STRING

app.use(cors())
app.use(express.static('public'))

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now FIRING on port ${PORT}!`)
})
//connect to database
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('shredstick')
        const surfCollection = db.collection('surfboards')
        const userCollection = db.collection('users')

        app.set('view engine', 'ejs')

        app.use(bodyParser.urlencoded({ extended: true }))

        app.use(bodyParser.json())

        app.use(express.static(__dirname + '/dist/'))

        // render surfboards / index
        app.get('/', (req, res) => {
            db.collection('surfboards').find().toArray()
                .then(results => {
                    res.render('index.ejs', { surfboards: results })
                })
                .catch(error => console.error(error))
        })
        //login
        app.get('/login', (req, res) => {
            res.render('login.ejs')
        })
        //register
        app.get('/register', (req, res) => {
            res.render('register.ejs')
        })
        // create surfboard obj in database
        app.post('/surfboards', (req, res) => {
            surfCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        // create user obj in database
        app.post('/users', (req, res) => {
            userCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        // delete board obj from database
        app.delete('/deleteBoard', (req, res) => {
            console.log(req.body.brand)
            surfCollection.deleteOne({
                brand: req.body.brand
            })
                .then(result => {
                    console.log(result)
                    res.json('deleted')
                })
                .catch(error => console.error(error))
        })
        //all surfboards JSON
        app.get('/api', (req, res) => {
            surfCollection.find().toArray()
                .then(results => {
                    res.json(results)
                })
                .catch(error => console.error(error))
        })
        //search board by name || brand
        app.get('/api/:name', (req, res) => {
            const boardSearch = req.params.name.split(' ').join('').toLowerCase()
            surfCollection.find().toArray()
                .then(results => {
                    res.json(results.filter(obj =>
                        obj.model.toLowerCase().includes(boardSearch)
                        || obj.brand.toLowerCase().includes(boardSearch)
                        || obj.size.includes(boardSearch)
                        || obj.desc.includes(boardSearch)
                    ))
                })
                .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))