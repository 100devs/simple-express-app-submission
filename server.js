const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

//set middleware.  put these before any gets, etc
app.set('view engine', 'ejs')  //sets up embedded javascript to make html templates
app.use(express.static('public'))   // sets up public file so our server.js can access them
app.use(express.urlencoded({extended:true})) //middleware to handle urls
app.use(express.json())  //middleware helps express parse json objects
app.use(cors());





let db,     //declare global variables outside of functions
    dbConnectionString = process.env.DB_STRING, // allows us to hide our password in .env file
    dbName = 'spoiled_puppy_database',     //set name of database in mongo
    collection  //this is defined in MongoClient.connect paragraph

    MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`connected to database`)
        db = client.db(dbName) //set the db variable the name of the database we're connecting to
        collection = db.collection('collection_of_spoiled_puppies')   //set name of collection with the database
  
        app.get('/', async (request, response) => {    //this renders the initial homepage with a list of current pets.  It is only tied to index.ejs
            db.collection('collection_of_spoiled_puppies').find().toArray()
            .then(data => {
                let nameList = data.map(item => item.petName)
                console.log(nameList)
                response.render('index.ejs', {info:nameList})  //passing in object with key info and namelist
            })
            .catch(error => console.log(error))
            
        })
        
        //***********attempt to display selected pet
        //******This is the section that I can't get to work.  Tried rendering to ejs file.  Also tried just using main.js to display results****/
        app.get('/api/:petName', (request, response) =>{
            const petsName = request.params.petName
            db.collection('collection_of_spoiled_puppies').find({petName: petsName}).toArray()
                .then(results => {
                    console.log(results)
                   response.json(results[0])
                })
                .catch(error => console.error(error))
        })
        //******************************************************************************************************************************* */
  
      })

//this is going to send a new object to mongo and mongo will make it a document in the collection.it is tied to index.ejs
app.post('/api', (request, response) => {
    console.log('post heard')
    db.collection('collection_of_spoiled_puppies').insertOne(
        request.body
    )
    .then(result =>{
        console.log(result)
        response.redirect('/')
    })
})

//the put request takes data from index.ejs update button and client-side main.js
app.put('/updateEntry', (request, response) => {
    console.log(request.body)

    Object.keys(request.body).forEach(key => {
        if(request.body[key]=== null || request.body[key]===undefined || request.body[key]===""){
            delete request.body[key]
        }  ///this section keeps it from over writing empty fields
    })
    console.log(request.body)
    db.collection('collection_of_spoiled_puppies').findOneAndUpdate(      //this section updates the database
        {petName: request.body.petName}, 
        {
            $set: request.body  //$ means this is a mongodb operator
        }
    )
    .then(result => {     //this is needed to stop errors in the console to complete the put
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.error(error))
})

//the delete section
app.delete('/deleteEntry', (request, response) => {
    db.collection('collection_of_spoiled_puppies').deleteOne(
        {petName: request.body.petName}, 
    )
    .then(result => {
        console.log('entry deleted')
        response.json('Entry deleted')  //has to have response or it'll make error
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//set up server to listen on port
app.listen(process.env.PORT || PORT, () => {
        console.log(`server is running on port ${process.env.PORT} `)
    })