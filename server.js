const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8888
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'rap'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('rappers').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addTopic', (request, response) => {
    db.collection('rappers').insertOne({stageName: request.body.stageName,
    birthName: request.body.birthName, likes: 0, time: 60, comments: []})
    .then(result => {
        console.log('Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})

app.put('/addOneComment', (request, response) => {
    db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS},{
        $push: {
            comments:request.body.commentS
          }
    })
    .then(result => {
        console.log('Comment')
        response.json('Comment Added')
    })
    .catch(error => console.error(error))
})

app.put('/countDown', (request, response) => {
    db.collection('rappers').updateOne({stageName: request.body.stageNameS, birthName: request.body.birthNameS, time: request.body.timeS},{
        $set: {
            time:request.body.timeS - 1
          }
    })
    .then(result => {
        console.log('count down')
        response.json('Counting Down')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteRapper', (request, response) => {
    db.collection('rappers').deleteOne({stageName: request.body.stageNameS})
    .then(result => {
        console.log('Deleted')
        response.json('Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})