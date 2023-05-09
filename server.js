// https://zellwk.com/blog/crud-express-mongodb/

const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient

const myApplication = express()

MongoClient.connect(
  "mongodb+srv://12nmcguire:a0uC7h7gXC3I9svt@cluster0.jeadbpg.mongodb.net/messages?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log(`Connected to database`)
    const db = client.db("my-messages")
    const messages = db.collection("messages")

    myApplication.use(bodyParser.urlencoded({ extended: true }))
    myApplication.use(express.static("public"))
    myApplication.use(bodyParser.json())
    myApplication.set("view engine", "ejs")

    const portNumber = 5000
    myApplication.listen(portNumber, function () {
      console.log(`listening on ${portNumber}`)
    })

    // myApplication.get(endpoint, callback)
    myApplication.get("/", (request, response) => {
      // response.sendFile(__dirname + "/index.html")
      // console.log(__dirname)

      // read quotes
      const cursor = db
        .collection("messages")
        .find()
        .toArray()
        .then((results) => {
          response.render("index.ejs", { messages: results })
        })
        .catch((err) => console.error(err))
    })

    myApplication.post("/messages", (request, response) => {
      console.log(request.body)
      messages
        .insertOne(request.body)
        .then((result) => {
          console.log("redirecting")
          response.redirect("/")
        })
        .catch((err) => console.error(err))
    })

    myApplication.put("/quotes", (request, response) => {
      messages
        .findOneAndUpdate(
          { name: "neil" },
          {
            $set: {
              name: request.body.name,
              quote: request.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => response.json("successfully updated quote"))
        .catch((err) => console.error(err))
    })

    myApplication.delete("/quotes", (request, response) => {
      messages
        .deleteOne({
          name: request.body.name,
        })
        .then((result) => {
          response.json("Deleted quote")
        })
        .catch((err) => console.error(err))
    })

  })
  .catch((err) => console.error(err))

// async function connectMongoClient(MongoClient) {
//   try {
//     const mongoClient = await MongoClient.connect()

//     console.log(mongoClient)
//     return mongoClient
//   } catch (errors) {
//     console.error(errors)
//   }
// }

// connectMongoClient(MongoClient)
