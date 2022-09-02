const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const cors = require('cors')
require('dotenv').config()



let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'vidList'

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
    db.collection('youtubers').find().sort({vidCount: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTuber', (request, response) => {
    db.collection('youtubers').insertOne({youtuberName: request.body.youtuberName, vidCount: 1})
    .then(result => {
        console.log('Youtuber Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addVidCount', (request, response) => {
    db.collection('youtubers').updateOne({youtuberName: request.body.youtuberName, vidCount: request.body.countS},{
        $set: {
            vidCount:request.body.countS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One To Video Count')
        response.json('Video Count Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteTuber', (request, response) => {
    db.collection('youtubers').deleteOne({youtuberName: request.body.youtuberName})
    .then(result => {
        console.log('Youtuber Deleted')
        response.json('Youtuber Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})