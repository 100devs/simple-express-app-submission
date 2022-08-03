// ========================
// Modules
// ========================
const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');

// ========================
// Variables
// ========================
require('dotenv').config();
const CONNECTION_STR = process.env.CONNECTION_STR;
const DB_NAME = 'personal';
const CL_NAME = 'cabinet';
const PORT = process.env.PORT || 9000;

// ========================
// Storage configurations
// ========================
const storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, 'public/uploads/images'); // destination folder
  },
  filename: function(request, file, callback) {
    callback(null, Date.now() + file.originalname); // filenaming
  }
});
const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 } // 10MB
});

// ========================
// Database Connection
// ========================
MongoClient.MongoClient.connect(CONNECTION_STR)
  .then(client => {
    const db = client.db(DB_NAME);
    const cabinet = db.collection(CL_NAME);
    console.log('Connected to database');

    // ========================
    // Middlewates
    // ========================
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.set('view engine', 'ejs'); 

    // ========================
    // Routes
    // ========================

    // Get data for initial render
    app.get('/', (_, res) => {
      cabinet.find().toArray()
        .then(results => {
          res.render('index.ejs', {items: results})
        })
        .catch(err => {
          console.log(err)
        })
    })

    // Post new item
    app.post('/post', upload.single('image'), (req, res) => {
      const body = req.body;
      const item = {
        title: body.title,
        price: body.price,
        brand: body.brand,
        dateAcquired: formatDate(body.dateAcquired),
        placeAcquired: body.placeAcquired,
        tags: [].concat(body.tags),
        image: req.file.filename
      }
      cabinet.insertOne(item)
        .then(_ => {
          res.redirect('/')
        })
        .catch(err => {
          console.log(err)
        })
    })

    // Delete item
    app.delete('/delete', (req, res) => {
      console.log(req.body.image)
      cabinet.deleteOne({title: req.body.title})
        .then (_ => {
          res.json(`${req.body.title} is deleted`);
          fs.unlinkSync("./public/uploads/images/" + req.body.image);
        })
        .catch(err => {
          console.log(err);
        })
    })

    // Update item
    app.put('/update', upload.single('updateimage'), (req, res) => {
      let updateObj = {
        title : req.body.title,
        price : req.body.price,
        brand : req.body.brand,
        dateAcquired : formatDate(req.body.dateAcquired),
        placeAcquired : req.body.placeAcquired,
        tags : [].concat(req.body.tags)
      }
      if (req.file) {
        fs.unlinkSync("./public/uploads/images/" + req.body.image);
        updateObj.image = req.file.filename
      };
      cabinet.findOneAndUpdate(
        {title: req.body.title}, 
        {$set: updateObj}
        )
        .then (_ => {
          res.json(`${req.body.title} is updated`);
        })
        .catch(err => {
          console.log(err);
        })
    })

    // API - Get information on one item
    app.get('/item/:title', (req, res) => {
      const title = req.params.title;
      cabinet.find({title: title}).toArray()
        .then(results => {
          res.json(results)
        })
        .catch(err => {
          console.log(err)
        })
    })

    // API - Get list of tags
    app.get('/tags', (req, res) => {
      cabinet.find().toArray()
        .then(results => {
          let tagsList = [];
          results.forEach(item => {
            item.tags.forEach(tag => {
              if (!tagsList.includes(tag)) {
                tagsList.push(tag);
              }
            })
          })
          res.json(tagsList)
        })
        .catch(err => {
          console.log(err)
        })
    })

    // ========================
    // Listen
    // ========================
    app.listen(PORT, () => console.log(`Serving running at port ${PORT}`));

  })
  .catch(err => {console.log(err)});

// ========================
// Helper Functions
// ========================

// Format date
function formatDate(date) {
  const d = new Date(date);
  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${da}-${mo}-${ye}`
}