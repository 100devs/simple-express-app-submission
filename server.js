// Standard Express and DB setup

const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'modelShowRegTest'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
 
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Main page 

app.get('/',(request, response)=>{
    response.render('index.ejs')
})
 
// Help page 

app.get('/help',(request, response)=>{
        response.render('help.ejs')
})
 
// Registration page  
 
app.get('/registration',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        response.render('registration.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/* Add a new entry, which is actually updating as it gets created on ID assignment */

app.post('/addEntryReg', (request, response) => {
    console.log(request.body)
    db.collection('modelShowRegTest').updateOne({
        id: Number(request.body.entryId)},{
            $set:{
                fullName: request.body.name,
                numOfModels: Number(request.body.numOfModels),
                inCompetition: request.body.inComp == "yesInComp",
                junior: request.body.junior == "yesJunior",
                judged: request.body.inComp == "yesInComp" ? request.body.judged == "yesJudged" : "N/A"
                }
            })
    .then(result => {
        console.log('Entry Added')
        response.redirect('/registration')
    })
    .catch(error => console.error(error))
})

/* Fetch next ID number */

app.get('/numOfEntries',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        response.send(String(data.length + 1))
    })
    .catch(error => console.error(error))
})

/* Fetch specific entry's data, this gets used elsewhere too */

app.get('/ID_:id', (req, res) => {
    db.collection('modelShowRegTest').findOne({id: Number(req.params.id)})
    .then(data => res.json(data))
})

/* Actual POST, happens when opening add form */

app.post('/postEntry', (request, response) => {
    db.collection('modelShowRegTest').find().toArray()
    .then(res => {
        let num = res.length
        if (num > 0) {
            let lastEntry = res[num - 1]
            if (!lastEntry.fullName) {
                id = lastEntry.id
                console.log("Empty entry detected!")
                response.send(String(id))
                return
            }
        }
        id = num + 1
        db.collection('modelShowRegTest').insertOne({
            "id": id,
            fullName: "",
            numOfModels: 0,
            inCompetition: false,
            prizes: {}
        })
        console.log('Entry Added')
        response.send(String(id))
    })
    .catch(error => console.error(error))
})

// Judging page

app.get('/judging',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        response.render('judging.ejs', { info: data })
    })
    .catch(error => console.error(error))
}) 

/* Entry form on judging page, with prizes */

app.post('/addEntryJudge', (request, response) => {
    console.log(request.body)
    db.collection('modelShowRegTest').updateOne({
        id: Number(request.body.entryId)},{
            $set:{
                judged: request.body.judged == "notForJudging" ? "N/A" : request.body.judged == "yesJudged",
                prizes: {
                    medal: request.body.medals,
                    bestOfShow: request.body.bestOfShow == "on",
                    junBestOfShow: request.body.junBestOfShow == "on",
                    corrr: request.body.corrr == "on",
                    peoplesChoice: request.body.peoplesChoice == "on",
                    sponsors: request.body.sponsors.split(',')
                }
                }
            })
    .then(result => {
        console.log('Entry added')
        response.redirect('/judging')
    })
    .catch(error => console.error(error))
})


/* Check to disallow assignment of unique prizes if already taken */

app.get('/checkFor_:prize',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        let prize = request.params.prize
        data = data.filter(e => e["prizes"][prize])
        response.json(data)
    })
    .catch(error => console.error(error))
})

// Filters page

app.get('/filters',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        response.render('filters.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

/* Filtering by particular prize */

app.get('/filters:prize',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        let prize = request.params.prize
        data = data.filter(e => {
            if (prize == "sponsors") {
                return e.prizes[prize] ? e.prizes[prize].join('') !== "" : false
            } else {
            return Object.values(e.prizes).includes(prize) || e.prizes[prize]
        }
    })
        console.log(data)
        response.render('filters.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Statistics page 

app.get('/stats',(request, response)=>{
    db.collection('modelShowRegTest').find().toArray()
    .then(data => {
        response.render('stats.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


// Hello
 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})