const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const MongoClient = require('mongodb').MongoClient
const connectionString = `mongodb+srv://todo:123Igbedumgbe@cluster0.4vrnc6y.mongodb.net/?retryWrites=true&w=majority`
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json())
MongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
    .then(client => {
        console.log('connected to database')
        const db = client.db('todo')
        const todoCollection = db.collection('todos')

        app.use(bodyParser.urlencoded({ extended: true }))
        app.get('/', (req, res) => {
            db.collection('todos').find().toArray()
                .then(results => {
                    res.render('index.ejs', { todos: results })

                })
                .catch(error => console.error(error))

        })

        app.post('/todos', (req, res) => {
            todoCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })



        app.listen(2000, function () {
            console.log('your server is running')
        })

    })
    .catch(error => console.log(error))


