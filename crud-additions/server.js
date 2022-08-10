const express = require('express');
const bodyParser = require('body-parser');
const { FindCursor } = require('mongodb');
const res = require('express/lib/response');
const MongoClient = require('mongodb').MongoClient;
const app = express();




MongoClient.connect(connectionString, {
    useUnifiedTopology: true})
    .then(client => {
       
        console.log('Connected to Database')
        const db = client.db('random-sentences');
        const quotesCollection = db.collection('sentences')
        app.set('view engine', 'ejs');

        app.use(bodyParser.urlencoded({extended: true}));    
        app.use(bodyParser.json());
        app.use(express.static('public'));
      

        app.get('/', (req,res) => {
            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results);
                    res.render('index.ejs', {sentences: results});
                })
                .catch(error => {
                    console.error(error);
                   
                })
            })
                
            // res.sendFile(__dirname + '/index.html');
            
            
     
        
            app.post('/sentences', (req, res) => {
              
             quotesCollection.insertOne(req.body)

                 .then(result => {
                     console.log(result);
                     res.redirect('/');
                       
                 })
            .catch(error => console.error(error));
                })
            })

            app.put('/sentences', (req, res) => {
                // console.log(req.body)
                console.log(req.body);

                quotesCollection.findOneAndUpdate(
                    { name: 'Darth Vader' },
                    {
                      $set: {
                        name: req.body.name,
                        quote: req.body.quote
                      }
                    },
                    {
                      upsert: true
                    }
                  )
                  .then(result => {
                    console.log(result)
                   })
                  .catch(error => console.error(error))
        
              
              })
            

    app.listen(3000, function() {
        console.log('Big brother is watching');
    })


