// /*
// npm init
// npm install cors, express, mongodb, dotenv
// ** IP Address: VPN - Tokyo Drift
// */

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const { MongoClient, ObjectId, Collection } = require('mongodb');
// const { response } = require('express');
// //ObjectID => used to pull object later on from 'mongodb"
// require('dotenv').config();
// const PORT = 8000;

// let db,
//     dbConnectionStr = process.env.DB_STRING; //Read from .env file "DB_STRING" param
//     dbName = 'sample_mflix',
//     collection = 'movies';

// // console.log(dbConnectionStr)
// MongoClient.connect(dbConnectionStr)
//     .then(client => {
//         console.log('... Connected to Database ...')
//         db = client.db(dbName)
//         collection = db.collection('movies')
//     })

// //Middleware
// app.use(express.urlencoded({extended  : true}))
// app.use(express.json())
// app.use(cors())

// //========== METHODS ==========
// //Reading Data from Server
// app.get("/search", async (request, response) => {
//     try {
//         let result = await Collection.aggregate([
//             {
//                 // Passing in a "Search" 
//                 "$Search" : {
//                     "autocomplete" : {
//                         "query" :`${request.query.query}`,
//                         "path" : "title", // Search ovy title
//                         //Fuzzy Search - type at least 3 letters before starting search
//                         "fuzzy": {
//                             "maxEdits":2,
//                             "prefixLength":3
//                         }
//                     }
//                 }
//             }
//         ]).toArray()
//         response.send(result)
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
// })

// //Get Back 1 item and display on HTML
// app.get("/get/:id", async (req,res) => {
//     try {
//         let result = await collection.findOne(
//             {
//                 "_id" : ObjectId(req.params.id)
//             }
//         )
//         res.send(result)
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
// }) //:<paramter>

// app.listen(process.env.PORT || PORT, () => { //Listening to PORT 
//     console.log('Server is running...')
// })

const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('movies')
    })

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())

app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "title",
                        "fuzzy": {
                            "maxEdits":2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        //console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        //console.log(error)
    }
})

app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})



