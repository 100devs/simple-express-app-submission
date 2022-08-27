const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'thought'

MongoClient.connect(dbConnectionStr,
    { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('thinkingthings').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addThought', (request, response) => {
    db.collection('thinkingthings').insertOne({thought: request.body.thought, signoff: request.body.signoff, likes: 0})
    .then(result => {
        console.log(request.body);
        console.log('thought acknowledged')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('thinkingthings').updateOne({thought: request.body.thoughtS, signoff: request.body.signoffS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log(request.body);
        console.log(`emphathized`);
        response.json('empathized');
    })
    .catch(error => console.error(error));

})

app.put('/removeOneLike', (request, response) => {
    db.collection('thinkingthings').updateOne({thought: request.body.thoughtS, signoff: request.body.signoffS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS - 1
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log(request.body);
        console.log(`dislike`);
        response.json('dislike');
    })
    .catch(error => console.error(error));

})


app.delete('/deleteThought', (request, response) => {
    db.collection('thinkingthings').deleteOne({thought: request.body.thoughtS})
    .then(result => {
        console.log(request.body);
        console.log('thought taken back');
        response.json('thought taken back');
    })
    .catch(error => console.error(error));

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})