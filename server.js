const express = require('express')
const path = require('path')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = process.env.PORT

let db, 
    dbConnectionStr = 'mongodb+srv://eryan411:testserver123@cluster0.701bxt1.mongodb.net/?retryWrites=true&w=majority'
    dbName = 'artist'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
// => Here we expose the views so it can be rendered.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// => Here we expose the dist folder
app.use(express.static(path.join(__dirname, 'dist')))


app.get('/', (req, res) => {
    db.collection('artists').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', {info: data})
    })
})

app.post('/addArtist', (req, res) => {
    db.collection('artists').insertOne({stageName: req.body.stageName,
    genre: req.body.genre, likes: 0})
    .then(result => {
        console.log('Artist Added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addLike', (req, res) => {
    db.collection('artists').updateOne({stageName: req.body.stageName, genre: req.body.genre, likes: req.body.likes}, {
        $set:{
            likes: req.body.likes + 1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log(`Added one like to ${req.body.stageName}, now at ${req.body.likes}`)
        res.json('Like added')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteArtist', (req, res) => {
    db.collection('artists').deleteOne({stageName: req.body.stageName})
    .then(result => {
        console.log('Artist Deleted')
        res.json('Artist Deleted')
    })
})

app.listen(PORT || 8000, () => {
    console.log(`Server is now running on ${PORT || 8000}`)
})