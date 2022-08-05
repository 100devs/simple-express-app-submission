const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

// middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database instance
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'book'

// connect to database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database.`);
        db = client.db(dbName);
        const booksCollection = db.collection('books');

        app.get('/', async (req, res) => {
            // get documents from MongoDB
            const bookItems = await booksCollection.find().toArray();
        
            // render root/home view
            res.render('index.ejs', { books: bookItems });
        })

        app.post('/addBook', (req, res) => {
            // add book to bookshelf
            booksCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/');
            })
            .catch(error => console.log(error));
        })
    })
    .catch(error => console.log(error));



app.listen(PORT, function() {
    console.log(`server is running on PORT ${PORT}`);
})