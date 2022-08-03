const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const { response } = require('express')
const PORT = 3000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'successStats'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/',(request, response)=>{
    db.collection('stats').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.get('/stories', (request, response)=>{
    db.collection('stories').find().toArray()
    .then(data => {
        response.render('stories.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

app.post('/addStat', (request, response) => {
    db.collection('stats').insertOne({prevTitle: request.body.prevTitle,
    prevIncome: request.body.prevIncome.replace(/[$,.]/g,''), techTitle: request.body.techTitle, techIncome: request.body.techIncome.replace(/[$,.]/g,'')})
    .then(result => {
        console.log('Stat Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.post('/addStory', (request, response) => {
    db.collection('stories').insertOne({newStory: request.body.newStory, industry: request.body.industry, 
        transTime: request.body.transTime, yearsExp: request.body.yearsExp, intNumber: request.body.intNumber, 
        techEducation: request.body.techEducation, lastTitle: request.body.lastTitle, currentTitle: request.body.currentTitle})
    .then(result => {
        console.log('Story Added')
        response.redirect('/stories')
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
