const express = require('express')
const app = express()
const MongoClient = require('MongoDB').MongoClient
const PORT = 2121
//require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'musicLibrary'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then( client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('playlists').find().toArray()
    .then(data => response.render('index.ejs', {playlists: data}))
    .catch(err => console.error('Error in get request ', err))
})

app.post('/addList', (request, response) => {
    const songList = request.body.songs.split(',')
    db.collection('playlists').insertOne({title: request.body.title, songs: songList})
    .then(result => response.redirect('/'))
    .catch(err => console.error('Error uploaded a new playlist: ', err))
})

app.delete('/deletePlaylist', (request, response) => {
    db.collection('playlists').deleteOne({title: request.body.title})
    .then(data => response.json('Playlist Deleted'))
    .catch(err => console.log(err))
})

app.put('/deleteSong', (request, response) => {
    db.collection('playlists').updateOne( {title: request.body.title} , {$pull : {songs: {$in: [request.body.song]}} })
    .then(data => response.json('Song Removed'))
    .catch(err => console.error('Error removing song: ', err))
})


app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`))