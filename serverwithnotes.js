const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

// ~~~~~~~~~~~~~~~~~ Express lets us use middleware with the use method.
    // Make sure you place body-parser before your CRUD handlers!
    app.use(bodyParser.urlencoded({ extended: true })) // Body-parser is middleware; helps tidy up the request object before we use them.
    app.use(express.static('public')) // express.static is middleware; makes 'public' folder accessible to the public
    app.use(bodyParser.json()) //tell our server to read JSON
    app.set('view engine', 'ejs') // Tells Express we're using EJS as the template engine. Must be placed before CRUD handlers.

// ~~~~~~~~~~~~~~~~~ Connect to Mongo.db
    // MongoClient.connect('mongodb+srv://first-crud-app:HyYHeuUVNE8uz@cluster0.agshq.mongodb.net/?retryWrites=true&w=majority', (err, client) => {
    //     if (err) return console.error(err)
    //     console.log('Connected to Database');
    // })
    // ~~~~~~~~~~~~~~~~~ Rewrite with promise
    MongoClient.connect('mongodb+srv://first-crud-app:HyYHeuUVNE8uz@cluster0.agshq.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('Connected to Database');
            const db = client.db('star-wars-quotes'); // example of changing our database: I chose to rename database. db will now be a variable for accessing our database
            
            // Tell Express to set up a server on port 3000
            app.listen(3000, function() {
                console.log('listening on 3000'); // shows us the function is working.
            })

            // CRUD Handlers (CREATE operation = POST request, READ operation = GET request)

            app.post('/quotes', (req, res) => {
                db.collection('quotes').insertOne(req.body) // add the quotes into our 'quotes' collection
                    .then(result => {
                        // console.log(result);
                        res.redirect('/') // the browser has a spinning favicon waiting for response from server. this is our response: redirect page back to /
                    })
                    .catch(error => console.log(error))
                // console.log(req.body)
            })

            //We want to display quotes on DOM. First, we have to get the quotes we stored in MongoDB by using find(). 
            app.get('/', (req, res) => {
                db.collection('quotes').find().toArray()
                  .then(quotes => {
                    res.render('index.ejs', { quotes: quotes }) // rendering the quotes on the DOM. index.ejs has to be a folder called "views"
                  })
                  .catch(error => console.log(error))
              })

            app.put('/quotes', (req,res) => {
                db.collection('quotes').findOneAndUpdate( // find one item in the database and change it
                    {name: 'Yoda'}, //look for an item with property name and value 'Yoda'
                    {
                        $set: {
                            name: req.body.name,
                            quote: req.body.quote
                        }
                    },
                    {
                        upsert:true //insert a document if no documents can be updated. this will force MongoDB to create a new Darth Vadar quote if no Yoda quotes exist to be replaced
                    }
                )
                .then(result => {
                    res.json('Success') //telling the JS that sent the PUT request that it was a success
                })
                .catch(error => console.log(error))
            })

            app.delete('/quotes', (req, res) => {
                db.collection('quotes').deleteOne( //MongoDB collections method deleteOne removes a document from the database
                  { name: req.body.name } //filter the collection to name: 'Darth Vadar' (req.body.name gives us the value of the req -> fetch -> the body property of fetch -> the name property of the body property)
                )
                  .then(result => { // send the response of that delete request back to JavaScript
                    if (result.deletedCount === 0) { 
                      return res.json('No quote to delete') //our server tells our main.js that there is no quote to delete
                    }
                    res.json('Deleted Darth Vadar\'s quote') //our server tells our main.js that we deleted the quote
                  })
                  .catch(error => console.error(error))
              })
        })
        .catch(error => console.log(error))


