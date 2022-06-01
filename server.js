const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

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

app.get('/', async (request, response) => {
    try{
        let data = await db.collection('playlists').find().toArray()
        await response.render('index.ejs', {playlists: data})
    }catch(err)
    {
        console.error('Error fetching homepage: ', err)
    }
})

app.post('/addList', async (request, response) => {
    try{
        const songList = request.body.songs.split(',')
        await db.collection('playlists').insertOne({title: request.body.title, songs: songList})
        response.redirect('/')
    }catch(err)
    {
        console.error('Error uploaded a new playlist: ', err)
    }
})

app.delete('/deletePlaylist', async (request, response) => {
    try{
        await db.collection('playlists').deleteOne({title: request.body.title})
        response.json('Playlist Deleted')
    }catch(err)
    {
        console.error('Error handling delete playlist request: ', err)
    }
    
    
})

app.put('/deleteSong', async (request, response) => {
    try{
        await db.collection('playlists').updateOne( {title: request.body.title} , {$pull : {songs: {$in: [request.body.song]}} })
        response.json('Song Removed')
    }catch(err)
    {
        console.error('Error removing song: ', err)
    }
})


app.listen(process.env.PORT || PORT, () => console.log(`Server is running`))