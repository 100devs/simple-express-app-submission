const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = 8000

// // //declaring database variables
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

//connecting to the database
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log('Connected to database');
        db = client.db(dbName);
        collection = db.collection('movies');
})

// //middlewares

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))

// //app requests and responses

// app.get('/', (request, response)=>{
//     response.sendFile(__dirname + '/index.html')
// })

app.get("/", (request, response) => {
    response.sendFile("index.html", { root: "public" });
  });


  
// //give data while serching
app.get("/search", async(request, response) => {
    try{
        let result = await collection.aggregate ([
            {
                "$search" : {
                    "autocomplete" : {
                        "query" :`${request.query.query}`,
                        "path" : "title",
                        "fuzzy" : {
                            "maxEdits": 2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message })

    }
})



//Return selected data
app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message })
    }

})

//setting up the server
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})

