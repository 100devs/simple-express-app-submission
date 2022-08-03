const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 2121;
require('dotenv').config();

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
    })
    .catch(error => console.log(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    // get documents from MongoDB

    // render root view
    res.render('index.ejs')
})

app.post('/addBook', (req, res) => {
    booksCollection.insertOne
})




app.listen(PORT, function() {
    console.log(`server is running on PORT ${PORT}`);
})