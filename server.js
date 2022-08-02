// ====== Modules ====== //
const express = require('express');
const app = express();
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// ====== Variables ====== //
const PORT = process.env.PORT || 8000;

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'booklyPlaylists',
  collection;

// ====== MongoDB connection ====== //
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then((client) => {
  console.log(`Connected to ${dbName} Database`);
  db = client.db(dbName);
  collection = db.collection('books');
});

// ====== MiddleWare ====== //
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ====== CRUD Framework ====== //
// == GET == index.ejs Homepage on '/'
app.get('/', async (request, response) => {
  try {
    const bookItems = await db.collection('books').find().toArray();
    response.render('index.ejs', { booksData: bookItems });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// == GET == discover-books.ejs Homepage on '/discover'
app.get('/discover', async (request, response) => {
  try {
    const bookItems = await db.collection('books').find().toArray();
    response.render('discover-books.ejs', { booksData: bookItems });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// == GET == Return completed-books.ejs on '/completed'
app.get('/completed', async (request, response) => {
  try {
    const bookItemsDateSorted = await db
      .collection('books')
      .find({ isCompleted: true })
      .sort({ completionDate: -1 })
      .toArray();
    const booksCompleted = await db
      .collection('books')
      .countDocuments({ isCompleted: true });

    response.render('completed-books.ejs', {
      booksData: bookItemsDateSorted,
      countCompleted: booksCompleted,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == GET == favorite-books.ejs Homepage on '/favorites'
app.get('/favorites', async (request, response) => {
  try {
    const bookItems = await db.collection('books').find({ isFavorited: true }).toArray();
    const booksFavorited = await db
      .collection('books')
      .countDocuments({ isFavorited: true });
    response.render('favorite-books.ejs', {
      booksData: bookItems,
      countFavorited: booksFavorited,
    });
  } catch (error) {
    response.status(500).send({ message: error.message });
  }
});

// == POST == Add new books to MongoDB on '/addBook' from inputbtn (see main.js)
app.post('/addBook', async (request, response) => {
  try {
    db.collection('books')
      .insertOne({
        bookId: request.body.bookId,
        bookTitle: request.body.bookTitle,
        bookAuthors: request.body.bookAuthors,
        bookPageCount: request.body.bookPageCount,
        bookDescription: request.body.bookDescription,
        bookImage: request.body.bookImage,
        userRating: request.body.userRating,
        isFavorited: request.body.isFavorited,
        isCompleted: request.body.isCompleted,
        completionDate: request.body.completionDate,
      })
      .then((result) => {
        console.log(`${request.body.bookTitle} - Added to Playlist`);
        response.json(`${request.body.bookTitle} - Added to Playlist`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == UPDATE == Adds a book to Favorites (isFavorited = true) on '/addFavorite' when clicking the favorite icon (see main.js)
app.post('/addFavorite', async (request, response) => {
  try {
    db.collection('books')
      .updateOne(
        { bookId: request.body.bookId },
        {
          $set: {
            isFavorited: true,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        console.log(`${request.body.bookTitle} - Added to Favorites`);
        response.json(`${request.body.bookTitle} - Added to Favorites`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == UPDATE == Removes a book from favorites (isFavorited = false) on '/rmFavorite' when clicking the favorite icon (see main.js)
app.post('/rmFavorite', async (request, response) => {
  try {
    db.collection('books')
      .updateOne(
        { bookId: request.body.bookId },
        {
          $set: {
            isFavorited: false,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        console.log(`${request.body.bookId} - Removed from Favorites`);
        response.json(`${request.body.bookId} - Removed from Favorites`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == UPDATE == Marks a book Completed (isCompleted = true) on '/markCompleted' when clicking Mark as Read (see main.js)
app.post('/markCompleted', async (request, response) => {
  try {
    db.collection('books')
      .updateOne(
        { bookId: request.body.bookId },
        {
          $set: {
            isCompleted: true,
            completionDate: new Date(),
          },
        },
        { upsert: true }
      )
      .then((result) => {
        console.log(`${request.body.bookId} - Marked Complete`);
        response.json(`${request.body.bookId} - Marked Complete`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == UPDATE == Marks a book Incompleted (isCompleted = false) on '/markIncompleted' when clicking  Mark as Read (see main.js)
app.post('/markIncompleted', async (request, response) => {
  try {
    db.collection('books')
      .updateOne(
        { bookId: request.body.bookId },
        {
          $set: {
            isCompleted: false,
            completionDate: null,
          },
        },
        { upsert: true }
      )
      .then((result) => {
        console.log(`${request.body.bookId} - Marked Incomplete`);
        response.json(`${request.body.bookId} - Marked Incomplete`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// == DELETE == Remove selected book from MongoDB on '/rmBook' from removeBookItemBtns (see main.js)
app.delete('/rmBook', async (request, response) => {
  try {
    db.collection('books')
      .deleteOne({ bookId: request.body.bookId })
      .then((result) => {
        console.log(`${request.body.bookTitle} - Deleted`);
        response.json(`${request.body.bookTitle} - Deleted`);
      });
  } catch (error) {
    response.status(500).send({ message: error.message });
    return;
  }
});

// Listen on server PORT
app.listen(PORT, () => {
  console.log(`Server is running on port`);
});
