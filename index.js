//Initializing app
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 3030
require('dotenv').config()

app.use(cors())
app.use(express.json())


const dbConnectionStr = process.env.DB_STRING

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('Tolkien-characters-api')
        const infoCollection = db.collection('Tolkien-characters')

        app.get('/', (req,res) => {
            res.send('<h1>Welcome to Tolkien Characters API</h1><p>Please use https://tolkien-characters-api-project.herokuapp.com/api/(character-name)</p>')
        })
        
        app.get('/api', (req,res) => {
            res.json(tolkienCharacters)
        })
        
        app.get('/api/:name', (req,res) => {
            const characterName = req.params.name.toLowerCase()
            infoCollection.find({name: characterName}).toArray()
            .then(results => {
                console.log(results)
                res.json(results[0])
            })
            .catch(error => console.error(error))
            
            // if(!infoCollection.findcharacterName) {
            //     res.status(404).json({error: `${characterName} not found`})
            // }
            // res.json(infoCollection[characterName])
        })

    })
    .catch(error => console.error(error))


//Setting the server to listen on PORT
app.listen(PORT)
console.log(`Server is runnining on port: ${PORT}`)