const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

let db,
    dbName = 'servants'


MongoClient.connect(process.env.DATABASE_URL, { useUnifiedTopology: true })
    .then(client => {

        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.static('audio'))
app.use(express.static('image'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('servants').find().toArray()
    .then(data =>{
        response.render('home.ejs', {info: data})
    })
    .catch(err => console.error(err))
})

app.get('/servants',(request, response)=>{
    db.collection('servants').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.get('/fate',(request, response)=>{
    db.collection('servants').find().toArray()
    .then(data => {
        response.render('fgo-simulator.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


app.get('/api/:servants',(request,response)=>{
    db.collection('servants').find().toArray()
    .then(data => {
     response.json(data)
   })
    .catch(error => console.error(error))
})




app.post('/comments', (request,response)=>{
    db.collection('servants').insertOne({name: request.body.name, servantID : request.body.servantID, gender: request.body.gender,
        class: request.body.class, image: request.body.image, rarity: request.body.rarity, attack: request.body.attack, attackMax: request.body.attackMax, 
        attackGrail: request.body.attackGrail, health: request.body.health, healthMax: request.body.healthMax, healthGrail: request.body.healthGrail, 
        cost: request.body.cost, starAbsorption: request.body.starAbsorption, starGeneration: request.body.starGeneration, 
        deathRate: request.body.deathRate, alignments: request.body.alignments, npCharge: request.body.npCharge, npAttack: request.body.npAttack, 
        comments: request.body.comments, likes: request.body.likes , commentLikes: 0
    })
        .then(result => {
            response.redirect('/data/comments')

        })
    .catch(error => console.error(error))
})

app.post('/servants', (request, response) => {
    db.collection('servants').insertOne({name: request.body.name, servantID : request.body.servantID, gender: request.body.gender,
    class: request.body.class, image: request.body.image, rarity: request.body.rarity, attack: request.body.attack, attackMax: request.body.attackMax, 
    attackGrail: request.body.attackGrail, health: request.body.health, healthMax: request.body.healthMax, healthGrail: request.body.healthGrail, 
    cost: request.body.cost,starAbsorption: request.body.starAbsorption, starGeneration: request.body.starGeneration, deathRate: request.body.deathRate,
     alignments: request.body.alignments, npCharge: request.body.npCharge, npAttack: request.body.npAttack, comments: request.body.comments,  likes: 0
})
    .then(result => {
response.redirect('/data')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('servants').updateOne({name: request.body.name, servantID : request.body.servantID, gender: request.body.gender,
        class: request.body.class, image: request.body.image, rarity: request.body.rarity, attack: request.body.attack, attackMax: request.body.attackMax, 
        attackGrail: request.body.attackGrail, health: request.body.health, healthMax: request.body.healthMax, healthGrail: request.body.healthGrail, 
        cost: request.body.cost,starAbsorption: request.body.starAbsorption, starGeneration: request.body.starGeneration, 
        deathRate: request.body.deathRate, alignments: request.body.alignments, npCharge: request.body.npCharge, npAttack: request.body.npAttack, comments: request.body.comments
        ,likes: request.body.likes
    },{
            $set: {
                likes:request.body.likes + 1
              }
        },{
            sort: {_id: -1},
            upsert: true
        })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))
    })

app.delete('/deleteServant', (request, response) => {
    db.collection('servants').deleteOne({name: request.body.name})
    .then(result => {
        response.json('Servant Deleted')
    })
    .catch(error => console.error(error))
})


app.get('/data/comments',(request, response)=>{
    db.collection('servants').find().toArray()
    .then(data =>{
        response.render('comments.ejs', {info: data})
    })
    .catch(err => console.error(err))
})

app.delete('/data/deleteComment', (request, response) => {
    db.collection('servants').deleteOne({comments: request.body.comments})
    .then(result => {
        response.json('Comment Deleted')
    })
    .catch(error => console.error(error))
})

app.put('/data/addCommentLike', (request, response) => {
    db.collection('servants').updateOne({name: request.body.name, servantID : request.body.servantID, gender: request.body.gender,
        class: request.body.class, image: request.body.image, rarity: request.body.rarity, attack: request.body.attack, attackMax: request.body.attackMax, 
        attackGrail: request.body.attackGrail, health: request.body.health, healthMax: request.body.healthMax, healthGrail: request.body.healthGrail, 
        cost: request.body.cost, starAbsorption: request.body.starAbsorption, starGeneration: request.body.starGeneration, 
        deathRate: request.body.deathRate, alignments: request.body.alignments, npCharge: request.body.npCharge, npAttack: request.body.npAttack, 
        comments: request.body.comments, likes: request.body.likes , commentLikes: request.body.commentLikes
    },{
            $set: {
                commentLikes: Number(request.body.commentLikes) + 1              }
        },{
            sort: {_id: -1},
            upsert: true
        })
        .then(result => {
            console.log('Added One Like')
            response.json('Like Added')
        })
        .catch(error => console.error(error))
    })



const filePath = './views/copy.ejs';    
const filePathCopy = './views/copy1.ejs';
    
fs.copyFile(filePath, filePathCopy, (err) => {
  if (err) throw err;
})

app.get('/data',(request, response)=>{
    db.collection('servants').find().toArray()
        .then(result => {
            response.render('copy1.ejs', { info: result })
        })
        .catch(err=>console.error(err))
})


app.listen(process.env.PORT || PORT, ()=>{  
    console.log(`Server running on port ${PORT}`)
})
