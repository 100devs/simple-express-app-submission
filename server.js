const express = require('express')
const app = express()
const PORT = 8000
const path = require('path')

const MongoClient = require('mongodb').MongoClient

let db;
let dbConnectionStr = 'mongodb+srv://Admin2:password@123@cluster0.egc7a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
let dbName = 'teamsRings'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
// app.use("/static", express.static(path.join(__dirname, "public")));


app.get('/', (request, response) => {
    db.collection('teamsRings').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        }).catch(err => console.error(err))
})

app.post('/addTeam', (request, response) => {
    db.collection('teamsRings').insertOne(request.body)
        .then(result => {
            console.log('team added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteTeam', (request, response) => {
    console.log(request.body)
    db.collection('teamsRings').deleteOne({ teamName: request.body.teamName })
        .then(result => {
            console.log('team deleted')
            response.json('team deleted')
        })
        .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on PORT 8000`)
})