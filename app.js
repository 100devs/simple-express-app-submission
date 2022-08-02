const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const PORT = 3002;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'colors';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
  .then(client => {
    console.log(`Connected to ${dbName} Database`);
    db = client.db(dbName);
  });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const colors = await db.collection('colors').find().sort().toArray();
    if (colors) {
      res.render('index.ejs', { colors: colors });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const resp = await db.collection('colors').insertOne({
      colorName: req.body.colorName,
      colorHex: req.body.colorHex,
      hearts: 0
    });
    if (resp) {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/heart', async (req, res) => {
  try {
    const color = req.query.color;
    const colorInfo = await db.collection('colors').findOne({ _id: ObjectId(color) });
    const update = {
      $set: {
        hearts: colorInfo.hearts + 1
      },
    };
    const resp = await db.collection('colors').updateOne({ _id: ObjectId(color) }, update);
    if (resp) {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

app.post('/delete', async (req, res) => {

  try {
    const color = req.query.color;
    console.log('delete', color);
    const resp = await db.collection('colors').deleteOne({ _id: ObjectId(color) });
    console.log(resp);
    if (resp) {
      res.redirect('/');
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});