// $ npm init
// $ npm install express --save
// $ npm install cors --save
// $ npm install ejs --save
// $ npm install mongodb --save

// require dependencies
const express = require('express')
// get all the goodies 
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
// assign a port
const PORT = 5000 

// connect to database
// db will hold the databse,  dbConnectionStr and dbName are variables we use while connecting the database to the db variable
let db,
    dbConnectrionStr = 'mongodb+srv://todolistUser:todolist@cluster0.ps0jw.mongodb.net/to-do-list?retryWrites=true&w=majority',
    dbName = 'to-do-list'

// code from mongo atlas, useUnifiedTopoly is nerd stuff.
MongoClient.connect(dbConnectrionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })
    .catch(error => console.error(error))

// setting up server and middleware
// use cors
app.use(cors())
// use ejs for the templates
app.set('view engine', 'ejs')
// magic line of code, any static files in public folder? serve them up
app.use(express.static('public'))
// next 2 lines allows us to look at data being passed back and forth from our request, look at data submitted in forms. New stuff instead of bodyparser
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.get('/', (request, response) =>{
    db.collection('tasks').find().toArray()
    .then(data =>{
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.log(error))
})

app.post('/addTask', (request, response) =>{
    db.collection('tasks').insertOne(request.body)
    .then(result =>{
        console.log('Task added')
        response.redirect('/')
    })
})

app.delete('/deleteTask', (request, response) =>{
    db.collection('tasks').deleteOne({ task: request.body.taskS})
    .then(result =>{
        console.log('Task deleted')
        response.json('Task deleted')
    })
    .catch(error => console.error(error))
})
// $ npm install heroku --save