const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'projects'

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('projects-db')
    })

// Middleware comes before CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    db.collection('projects-db').find().toArray()
        .then(data => {
            response.render('index.ejs', { info: data })
        })
        .catch(error => console.error(error))
})

app.post('/addProject', (request, response) => {
    db.collection('projects-db').insertOne({ devName: request.body.devName, siteName: request.body.siteName, siteUrl: request.body.siteURL, screenshot: request.body.screenshot, githubRepo: request.body.githubRepo, twitter: request.body.twitter, techStack: request.body.techStack, projectType: request.body.projectType })
        .then(result => {
            console.log('Project Added')
            response.redirect('/')
        })
        .catch(error => console.error(error))
})


app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is running`)
})