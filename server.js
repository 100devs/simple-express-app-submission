//npm run dev -- to run `nodemon server.js` -- package.json has the script that made that work for us withoug the `./node_modules....` pre stuff
    //restarts the server instead of having to do so in the command line after each save, still have to refresh teh webpage to see the changes
const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://yoda:doordonot@cluster0.53ahc0p.mongodb.net/?retryWrites=true&w=majority'
const app = express();

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        //view engine to ejs, to can dynamic html --must do before other handlers
        app.set('view engine', 'ejs')

        //***Put all epxress request handlers into the MongoClients's .then call */
        // app.use should be before the other handlers
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(express.static('public'))
        app.use(bodyParser.json())


        app.get('/', (req, res) => {
            // res.send('Hello World!') //just showed the text in the browser - don't know how sense did not use a p tag or anything 
            
            //get quotes from MongoDB
            db.collection('quotes').find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs',{quotes: results})
            })
            .catch(error => console.log(error))
            
            // console.log(curser)

        
            //send file back to browser
            // res.sendFile(__dirname + '/index.html') 
        
        })

        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                console.log(req.body)//shows name/quote entered in form 
                res.redirect('/')
            })
            .catch(error => console.error(error))
        })

        app.put('/quotes', (req, res) => {
            // console.log(req.body) //shows darth name/quote after clicking replace button

            quotesCollection.findOneAndUpdate(
                {name: 'Yoda'},
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
                // console.log(result)
                res.json('Success')
            })
            .catch(error => console.log(error))
        })

        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                {name: req.body.name}
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No quote to delete')
                }//otherwise
                res.json('Deleted Darth Vader\'s quote')
            })
            .catch(error => console.log(error))

        })

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
        

    })
    .catch(error => console.log(error))

console.log('May Node be with you')

//Make sure to use the body parser middleware before CRUD handlers
// app.use(bodyParser.urlencoded({extended: true}))
    //The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

//****************GET/Read**********************
//if .get is not there the web page will say Cannon GET / "/" being the understood default page to load from the domain name. 
//app.get('/', (req, res) => {
    // res.send('Hello World!') //just showed the text in the browser - don't know how sense did not use a p tag or anything 

    //send file back to browser
//    res.sendFile(__dirname + '/index.html') //dirname is the current directory - __dirname is a variable that is set to the current directory

//})

//****************POST/Create**********************
//our form action "/quotes" submit button is what forces this post to happen
// app.post('/quotes', (req, res) => {
//     // console.log("Hellooooooooo! Post request!")
//     console.log(req.body) //this is the data that is being sent from the form after pushing the submit button
// })

//****************Local Host location**************
//where server can be seen locally when run `node server.js`
// app.listen(3000, function() {
//     console.log('listening on 3000')
// })