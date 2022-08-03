
const express = require('express');
const { ObjectId } = require('mongodb');
const MongoClient = require('mongodb').MongoClient
const app = express();
const fs = require('fs')
const path = require('path')
const PORT = 9001
require('dotenv').config()

let db,
    blogCollection,
    db_username = process.env.DB_PUBLIC_USERNAME,
    db_password = process.env.DB_PUBLIC_PASSWORD,
    userLoggedIn = false

// MongoDB

MongoClient.connect(`mongodb+srv://${db_username}:${db_password}@shilohr.knqxta6.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database')
        db = client.db('test-blog')
        blogCollection = db.collection('test-blog-posts')
    })
    .catch(error => console.error(error))

// Pre-CRUD Handlers

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.static('public'))

// CRUD Handlers

app.get('/', (req, res) => {
    // Get blog posts from database
    blogCollection.find().toArray()
        .then(results => {
            // Render blog titles into HTML
            res.render('index.ejs', { blogs: results })
        })
        .catch(error => console.error(error))
})

app.get('/blogbyid/:id', (req, res) => {
    const blogID = req.params.id
    // Get blog posts from database
    blogCollection.findOne(ObjectId(blogID))
        .then(results => {
            // Create HTML file for blog post
            fs.writeFile(
                path.join(__dirname, '/public/blog-posts', `${results._id}.html`),
                results._HTML,
                err => {
                    if (err) throw err
                    console.log(`File written with an id of ${results._id}`)
                }
            )
            res.json(results)
        })
        .catch(error => console.error(error))
})

app.get('/login/:username&:password', (req, res) => {
    db_username = req.params.username
    db_password = req.params.password
    MongoClient.connect(`mongodb+srv://${db_username}:${db_password}@shilohr.knqxta6.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to Database')
            db = client.db('test-blog')
            blogCollection = db.collection('test-blog-posts')
            userLoggedIn = true
            res.json([db_username, userLoggedIn])
        })
        .catch(error => {
            console.error(error)
            userLoggedIn = false
            res.json([db_username, userLoggedIn])
        })
})

app.get('/logout', (req, res) => {
    db_username = process.env.DB_PUBLIC_USERNAME
    db_password = process.env.DB_PUBLIC_PASSWORD
    MongoClient.connect(`mongodb+srv://${db_username}:${db_password}@shilohr.knqxta6.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
        .then(client => {
            console.log('Connected to Database')
            db = client.db('test-blog')
            blogCollection = db.collection('test-blog-posts')
        })
        .catch(error => {
            console.error(error)
        })
})

app.post('/blog', (req, res) => {
    req.body._HTML = 
    `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${req.body.title}</title>
    </head>
    <body>
        <a href="/">Go Back</a>
        <h1>${req.body.title}</h1>
        <p>${req.body.body}</h1>
    </body>
    </html>`
    blogCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => {
            console.error(error)
            res.send(`<script>window.location.href = "unauthorized.html"</script>`)
        })
})

// app.put('/quotes', (req, res) => {
//     blogCollection.findOneAndUpdate(
//         { name: 'yoda' },
//         {
//             $set: {
//                 name: req.body.name,
//                 quote: req.body.quote
//             }
//         },
//         { upsert: true }
//     )
//         .then(result => {
//             res.json('Success')
//         })
//         .catch(error => console.error(error))
// })

// app.delete('/quotes', (req, res) => {
//     blogCollection.deleteOne(
//         { name: req.body.name }
//     )
//         .then(result => {
//             if (result.deletedCount === 0) return res.json('No quote to delete')
//             res.json(`Deleted Darth Vader's quote`)
//         })
//         .catch(error => console.error(error))
// })

app.listen(process.env.PORT || PORT, function(){
    console.log(`listening on port ${PORT}`)
})