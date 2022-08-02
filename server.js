const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const path = require("path");
const e = require('express');
const PORT = 3000;
require('dotenv').config();
const username = process.env.USERNAME
const password = process.env.PASSWORD
const database_url = process.env.DATABASEURL
const dbName = process.env.DBNAME
const dbCollection = process.env.DBCOLLECTION

console.log(process.env)

// CRUD 
// CREATE = POST
// READ = GET
// UPDATE = PUT
// DELETE = DELETE

console.log("we have lift off")

MongoClient.connect(`mongodb+srv://${username}:${password}@${database_url}`, {
useUnifiedTopology: true})
    .then (client => {
        console.log('Connected to Database')
        const db = client.db(`${dbName}`)
        const quotesCollection = db.collection(`${dbCollection}`)

        // console.log(quotesCollection[0].name);
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        // app.get('/', (req, res) => {res.sendFile('/Users/daniel/Documents/File\ Cabinet/100Devs/Video-and-Reading-Work-Throughs/Node-Express-MongoDB/index.html')
        // })
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.json())
        
      //let listValues
        
        //This is what gets all the Atlas Data for display
        app.get('/', (req, res) => {
          const cursor = db.collection('quotes').find()
          db.collection('quotes').find().toArray()
            .then(results => {
              //listValues = results
              res.render('index.ejs', {quotes: results})
            })
            .catch(error => console.error(error))
        })

       //This creates the Yoda Quore 
       app.post('/quotes', (req, res) => {
         if (req.body.name !== ''){

          let formatedName
          formatedName = req.body.name.toLowerCase().split('')
          formatedName[0] = formatedName[0].toUpperCase()
          formatedName = formatedName.join('')

            quotesCollection.findOneAndUpdate(
              { name: formatedName},
              {   $set: { name: formatedName,
                          quote: req.body.quote,
                          st: false, }
              },
              { upsert: true }
            )
            .then(result => {
              res.redirect('/')
            })
            .catch(error => console.error(error))
          }else{
            console.log('no values submitted')
            .then(result => {
              res.redirect('/')
            })
          }
        })

        app.put('/quotes', (req, res) => {
          // console.log(req.body.st)
          if (req.body.st === true){
            quotesCollection.findOneAndUpdate(
              { name: req.body.name},
              { $set: { st: false, } },
              { upsert: false }
            )
            .then(result => {
              res.redirect('/')
            })
            .catch(error => console.error(error))

          }else if (req.body.st === false){
            quotesCollection.findOneAndUpdate(
              { name: req.body.name},
              { $set: { st: true, } },
              { upsert: false }
            )
            .then(result => {
              res.redirect('/')
            })
            .catch(error => console.error(error))
          }


        })




          app.delete('/quotes', (req, res) => {
            // console.log(req.body);
            //if(req.body.name !== '')
            {
              quotesCollection.deleteOne(req.body)
                .then(result => {
                  res.json('Success')
                 })
                .catch(error => console.error(error))
            }
            // else if(req.body.name === ''){
            //   quotesCollection.deleteMany({})
            //   .then(result => {
            //     if (result.deletedCount === 0) {
            //       return res.json('No quote to delete')
            //     }
            //     res.json(`Deleted All Entries`)
            //   })
            //   .catch(error => console.error(error))
            // }
          })

        app.listen(process.env.PORT || PORT, function() {
          console.log('Connected to server')
       })
  })
  .catch(console.error)