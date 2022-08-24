const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
const PORT = 2121
const ObjectId = require('mongodb').ObjectID
const methodOverride = require('method-override')
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'symptoms'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//METHOD OVERRIDE
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
}))

//LOAD HOMEPAGE
app.get('/',(request, response)=>{
    db.collection('symptoms').find().sort({date:-1}).toArray()
    .then(data => {
        response.render('index.ejs', { entries: data })
    })
    .catch(error => console.error(error))
})

//ADD NEW ENTRY
app.post('/addEntry', (request, response) => {
    db.collection('symptoms').insertOne({
        date: request.body.date,
        painLevel: request.body.painLevel})
    .then(result => {
        console.log(`Entry added for ${request.body.date}`)
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

//LOAD EDIT PAGE FOR EXISTING ENTRY
app.get('/editPage/:id',(request, response)=>{
    db.collection('symptoms').findOne({ _id: ObjectId(request.params.id) })
    .then(data => {
        console.log(data)
        response.render('edit.ejs', { entry: data })
    })
    .catch(error => console.error(error))
})

//EDIT EXISTING ENTRY
app.put('/editEntry/:id', (request, response) => {
    db.collection('symptoms').updateOne(
        {_id: ObjectId(request.params.id)},
        {
            $set: {
                date: request.body.date,
                painLevel: request.body.painLevel
            }
        })
    .then(result => {
        console.log('Entry updated')
        response.redirect('/')
    })
    .catch(error => console.error(error))

})

//DELETE EXISTING ENTRY
app.delete('/deleteEntry', (request, response) => {
    db.collection('symptoms').deleteOne({date: request.body.date})
    .then(result => {
        console.log(request.body)
        console.log(`Entry deleted for ${request.body.date}`)
        response.json(`Entry deleted for ${request.body.date}`)
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})