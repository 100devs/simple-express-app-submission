//Declare variables in use
const express = require('express')
const app = express()
const cors = require('cors')
const { response } = require('express')
const { ObjectId } = require('mongodb')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//Declare MongoDB variables and connect to database
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'gratitude-journal',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db('gratitude-journal')
        collection = db.collection('daily-entry')
    })
    .catch(error => console.error(error))

    //Display homescreen
    app.get('/', (request, response) => {
            collection.find().toArray()
                .then(results => {
                    console.log(results)
                    response.render('index.ejs', {entries: results})
                })
                .catch(error => console.error(error))
    })

    //POST a new entry to the database
    app.post('/', (request, response) => {
            collection.insertOne(request.body)
                .then(result => {
                    console.log(result)
                    response.redirect('/')
                })
                .catch(error => console.error(error))
    })

    //EDIT and update an entry
    app 
        .route('/edit/:id')
        .get((request, response) => {
            //store id of request in variable 'id'
            const id = request.params.id
            console.log(`${id}`)
            //create array of 
            // console.log(collection.find())
            collection.find().toArray()
            //render edit page
            //put date into h2
            .then(results => {
                response.render('edit.ejs', { 
                    entries : results, 
                    idEntry: id
                })
            })
        })
        .post((request, response) => {
            const id = request.params.id
            console.log(`${id}`)
            collection.findOneAndUpdate(
                { _id: ObjectId(id)},
                {
                    $set: { 
                        "first": request.body.first,
                        "second": request.body.second,
                        "third": request.body.third }
                })
            response.redirect('/')
            
    })

    //DELETE
    app
        .route('/edit/:id')
        .get((request, response) => {
            //store id of request in variable 'id'
            const id = request.params.id
            console.log(`${id}`)
            //create array of 
            // console.log(collection.find())
            collection.find().toArray()
            //render edit page
            //put date into h2
            .then(results => {
                response.render('edit.ejs', { 
                    entries : results, 
                    idEntry: id
                })
            })
        })
        .delete((request, response) => {
            const id = request.params.id
            collection.findOneAndDelete( 
                { _id: ObjectId(id) })
            .then(result => {
                console.log('success')
                response.json({ redirect: '/'})
            })
            .catch(err => console.log(err))
        })

    //Create port to listen on 
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server is running on PORT ${process.env.PORT}`)
    })