const express = require('express')
const app = express()
const PORT = 3000
const MongoClient = require('mongodb').MongoClient


let db,
    dbConnectionStr = 'mongodb+srv://simpleCRUD:cruddy@cluster0.vqpah.mongodb.net/simple-crud-api-hmwk?retryWrites=true&w=majority',
    dbName = 'simple-crud-api-hmwk'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client => {
        console.log(`connected to ${dbName} Database`)
        db = client.db(dbName)
    })

//
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(express.json())

app.get('/', (request,response)=>{
    db.collection('characters').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addCharacter', (request,response)=>{
    db.collection('characters').insertOne({charName: request.body.charName, teamName: request.body.teamName})
    .then(result => {
        console.log('Character Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


app.delete('/deleteCharacter', (request, response) => {
    db.collection('characters').deleteOne({charName: request.body.charNameS})
    .then(result => {
        console.log('Character Deleted')
        response.json('Character Deleted')
    })
    .catch(error => console.error(error))
})

//listening
app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on ${PORT}`)
})