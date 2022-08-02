const express = require('express') // enables express
const app = express() // sets a variable to use express
const MongoClient = require('mongodb').MongoClient // enables mondoDB
const PORT = 2121 //assigns a local port number
require('dotenv').config() // allows for the use of .env files


let db, // creates the variable db
    dbConnectionStr = process.env.DB_STRING, // sets a variable for the mongoDB login information
    dbName = 'todo-list' // sets a variable stating the name of the mongoDB database name

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }) // connects to the mongdb database
    .then(client => { //sets variable client to match mogodb info
        console.log(`Connected to ${dbName} Database`) // console logs connected message
        db = client.db(dbName) // sets database to the matching database set above
    })
    
app.set('view engine', 'ejs') // tells browser to use ejs file
app.use(express.static('public')) // directs path execution to the public folder. 
app.use(express.urlencoded({ extended: true })) // helps parse the data
app.use(express.json()) // converts data to json for use in the ejs file


app.get('/',async (request, response)=>{ // endpoint listener
    const todoItems = await db.collection('todos').find().toArray() // creates an array of items from the database
    const itemsLeft = await db.collection('todos').countDocuments({completed: false}) // returns number of entries in the databse
    response.render('index.ejs', { items: todoItems, left: itemsLeft }) // renders the databse so ejs can read the entries properly
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => { // endpoint listener for addOne mongoDB
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false}) // creating an object and pushing it to mongodb
    .then(result => { // stores result into a variable
        console.log('Todo Added') // console logs if successfull
        response.redirect('/') // redirects us to main page with updated info
    })
    .catch(error => console.error(error)) // console logs if there was an error
})

app.put('/markComplete', (request, response) => { // endpoint listener to mark complete
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // grabs text from javascript and finds the database object of the same name
        $set: { // prepares to change object's properties
            completed: true //changes the opject's properties to true in mongodb
          }
    },{
        sort: {_id: -1}, //sorts by id number
        upsert: false //creates a property of "completed" if it does not exist on the object in mongoDB
    })
    .then(result => { // stores result in variable
        console.log('Marked Complete') // console logs that the object has been marked as complete
        response.json('Marked Complete') // send the same information to the await funtion in javascript
    })
    .catch(error => console.error(error)) // console logs if there is an error

})

app.put('/markUnComplete', (request, response) => { // endpoint listener to mark uncomplete
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{ // grabs text from javascript and finds the database object of the same name
        $set: { // prepares to change object's properties
            completed: false //changes the opject's properties to false in mongodb
          }
    },{
        sort: {_id: -1}, //sorts by id number
        upsert: false //creates a property of "completed" if it does not exist on the object in mongoDB
    })
    .then(result => { // stores result in variable
        console.log('Marked UnComplete') // console logs that the object has been marked as uncomplete
        response.json('Marked UnComplete') // send the same information to the await funtion in javascript
    })
    .catch(error => console.error(error)) // console logs if there is an error

})

app.delete('/deleteItem', (request, response) => { // endpoint listener to delete object
    db.collection('todos').deleteOne({thing: request.body.itemFromJS}) // grabs text from javascript and finds the database object of the same name and deletes it
    .then(result => { // prepares to change object's properties
        console.log('Todo Deleted') // console logs that the object has been deleted
        response.json('Todo Deleted') // send the same information to the await funtion in javascript
    })
    .catch(error => console.error(error)) // console logs if there is an error

})

app.listen(process.env.PORT || PORT, ()=>{ //sets the port to listen to mongoDB assigned or localHost
    console.log(`Server running on port ${PORT}`) // console logs the port it is running on
})