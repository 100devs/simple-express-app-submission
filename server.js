const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const cors = require ('cors')
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'song-list'

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
    db.collection('songs').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})


app.post('/addSong', (request, response) => {
    db.collection('songs').insertOne({bandName: request.body.bandName,
    songName: request.body.songName, likes: 0})
    .then(result => {
        console.log('Song Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('songs').updateOne({bandName: request.body.bandNameS, songName: request.body.songNameS,likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
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

// app.put('/addOneDislike', (request, response) => {
//     db.collection('songs').updateOne({bandName: request.body.bandNameS, songName: request.body.songNameS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS - 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Dislike')
//         response.json('Dislike Added')
//     })
//     .catch(error => console.error(error))

// })

app.delete('/deleteSong', (request, response) => {
    db.collection('songs').deleteOne({bandName: request.body.bandNameS})
    .then(result => {
        console.log('Song Deleted')
        response.json('Song Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})