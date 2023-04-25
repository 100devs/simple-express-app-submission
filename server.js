// https://zellwk.com/blog/crud-express-mongodb/
const express = require("express")
const bodyParser = require("body-parser")
// const MongoClient = require("mongodb").MongoClient

const myApplication = express()

myApplication.use(bodyParser.urlencoded({ extended: true }))

const portNumber = 5000
myApplication.listen(portNumber, function () {
  console.log(`listening on ${portNumber}`)
})

// myApplication.get(endpoint, callback)
myApplication.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html")
  console.log(__dirname)
})

myApplication.post("/messages", (request, response) => {
  console.log(request.body)
})

const { MongoClient, ServerApiVersion } = require("mongodb")
const uri =
  "mongodb+srv://12nmcguire:a0uC7h7gXC3I9svt@cluster0.jeadbpg.mongodb.net/?retryWrites=true&w=majority"
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 })
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    )
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)
