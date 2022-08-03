const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'FlickFreak'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req,res)=>{
    db.collection('movies').find().toArray()
    .then (data => {
        res.render('index.ejs', {info: data})
    })
    .catch(err => console.error(err))
});

app.post('/addMovie', (req, res) =>{
    db.collection('movies').insertOne({movieName: req.body.movieName,
    watched: false,
    watchedDate: '1999/01/01'})
    .then(result => {
        console.log('Movie added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

function getDate(){
    let date = new Date()
    date = date.toString()
    return date.slice(0,15)
}

app.put('/addToWatched', (req, res) => {
    db.collection('movies').updateOne({movieName: req.body.movieName, 
        watched: req.body.watched},{
        $set: {
            watched: true,
            watchedDate: getDate()
          }
    },{
        upsert: true
    })
    .then(result => {
        console.log('Watched movie')
        res.json('Movie Watched')
        //res.redirect('/')
    })
    .catch(err => console.error(err))

});

app.delete('/deleteMovie', (req, res) => {
    db.collection('movies').deleteOne({movieName: req.body.movieName})
    .then(result => {
        console.log('Unwatched Movie Deleted')
        res.json('Unwatched Movie Deleted')
    })
    .catch(err => console.error(err))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});