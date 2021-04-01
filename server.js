const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config()


//process.env.DB_STRING || 

let db, 
    dbConnectionStr = process.env.DB_STRING
    dbName = 'officequotes'

MongoClient.connect(dbConnectionStr, {
    useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    db.collection('quotes').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', { info: data } )
    })
    .catch(error => console.error(error))
});

app.post('/addQuote', (req, res) => {
    db.collection('quotes').insertOne({quote: req.body.quote, name: "- " + req.body.name, likes: 0} )
    .then(result => {
        console.log("Quote Added")
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteQuote', (req, res) => {
    db.collection('quotes').deleteOne({ quote: req.body.charQuote})
    .then(result => {
        console.log("Quote Deleted")
        res.json("Quote Deleted")
    })
    .catch(error => console.error(error))
});

app.put('/addOneLike', (req, res) => {
    db.collection('quotes').updateOne({quote: req.body.charQuote, name: req.body.charName, likes: req.body.charLikes}, {
        $set: {
            likes: req.body.charLikes + 1
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log("Added One Like")
        res.json("Like Added")
    })
    .catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


