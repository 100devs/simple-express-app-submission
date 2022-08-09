// THANK YOU MAYANWOLFE! 
// https://www.youtube.com/watch?v=s5FtvtYgc68&t=1350s

const express = require('express');
const { ObjectId } = require('mongodb');
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

// connect to database, create paths
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database.`);
        db = client.db(dbName);
        const booksCollection = db.collection('books');

        // RENDER BOOKSHELF
        app.get('/', async (req, res) => {
            // get documents (books) from MongoDB
            const bookItems = await booksCollection.find().toArray();
    
            // render root view, send documents (book to ejs template)
            res.render('index.ejs', { books: bookItems });
        })

        // ADD BOOK
        app.post('/addBook', (req, res) => {
            // add book to bookshelf
            booksCollection.insertOne({title: req.body.title, author: req.body.author, read: false})
            .then(result => {
                console.log('Book added.')
                res.redirect('/');
            })
            .catch(error => console.log(error));
        })

        // MARK READ/UNREAD
        app
            .route("/readBook/:id")
            .get((req, res) => {
                const id = req.params.id;
                booksCollection.updateOne(
                    { _id:ObjectId(id) },
                    { $set: { "read" : true } }    
                );
                
                console.log('Book read.');
                res.redirect('/');
            })
        
            // DELETE BOOK
        app
            .route("/deleteBook/:id")
            .get((req, res) => {
                const id = req.params.id;
                booksCollection.deleteOne({_id:ObjectId(id)});
                
                console.log('Book deleted.');
                res.redirect('/');
            })

    })
    .catch(error => console.log(error));

app.listen(process.env.PORT || PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})