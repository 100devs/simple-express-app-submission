const express = require('express')
const fs = require('fs')
const { MongoClient, ServerApiVersion } = require('mongodb')

// ----------------------------------------------------------------------------
// Global Variables
const PORT = process.env.PORT || 3000

// ----------------------------------------------------------------------------
// Static functions
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ----------------------------------------------------------------------------
// A class to run and manage a Node Express server and its MongoDB connection.
class ExpressServer {
  // ----------------------------------------------------------------------------
  // Private properties
  #credentialsURI
  #mongoClientSetup

  // ----------------------------------------------------------------------------
  // Initial setup
  constructor() {
    this.app = express()
    this.#credentialsURI = process.env.mongo_db_hw_uri
    this.#mongoClientSetup = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1
    }

    this.MongoClient = null
    this.db = null
    this.recipeCollection = null
    this.docCount = null
    this.recipeDB = 'recipe-db'
    this.retryCount = 0
    this.retryLimit = 10
    this.retryDelayMs = 1000
  }

  // ----------------------------------------------------------------------------
  // Startup the Express server on the designated port.
  startServer() {
    this.#setupMiddleware()
    this.#setupRoutes()

    this.app.listen(PORT, () => {
      console.log(`🐡 Node up on port ${PORT} 🐡`)
    })
  }

  // ----------------------------------------------------------------------------
  // Setup helper methods
  #setupMiddleware() {
    // Since we can't send multiple files with sendFile, and we want to serve
    // things like index.html and its stylesheet, we can use static instead.
    // This will serve everything placed in the "public" directory.
    this.app.use(express.static('public'))

    // Used to parse JSON bodies.
    // We don't need to use body-parser anymore as of Express 4.16.0+
    this.app.use(express.json())

    // Used to parse URL-encoded bodies using qs (query string) library.
    this.app.use(express.urlencoded({ extended: true }))

    // Set embedded javascript as the template engine.
    this.app.set('view engine', 'ejs')

    // Custom middleware:
    this.app.use(this.requestLogger)
  }

  // ----------------------------------------------------------------------------
  #setupRoutes() {
    // -----------------------
    // GET Index page serving EJS template, and including all recipes as an array.
    this.app.get('/', async (req, res) => {
      await this.waitForCollection(res)
      this.retryCount = 0

      const recipes = await this.recipeCollection.find({}).toArray()
      console.log(`🦆 Recipes found: ${recipes.length} 🦆`)
      res.render('index', { recipes })
    })

    // -----------------------
    // POST Route for submitting a new recipe.
    this.app.post('/add', async (req, res) => {
      req = this.sanitizeRequestQueryBody(req)

      try {
        // TODO: Needs to be unique keys, rather than by name only. Otherwise queries by name get confused
        //  for multiple identical entries.
        const result = await this.recipeCollection.insertOne(req.body)
        console.log(`🦆 Inserted 1 document into collection, insertion ID: ${result.insertedId}`)
        console.log(req.body)
        res.redirect('/')
      }
      catch (err) {
        console.error(`🐡 Error adding recipe: ${err}`)
        res.send('🐡 Error adding recipe! 🐡')
      }
    })

    // -----------------------
    // PUT Route for updating an existing recipe.
    this.app.put('/recipes', async (req, res) => {
      // Sanitize input.
      req = this.sanitizeRequestQueryBody(req)

      const updatedRecord = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
      }
      const filter = { name: req.body.name }


      try {
        const updateResult = await this.recipeCollection.findOneAndUpdate(
            // Search by the name, and $set matching record to the updatedRecord.
            filter,
            { $set: updatedRecord },
            { upsert: false }
        )
        console.log(`🦆 Updated 1 document in collection: ${req.body.name} 🦆`)
        console.log(`MongoDB Acknowledgement: ${updateResult.acknowledged}`)
        // Send the request body back as a response to a successful update.
        res.send(req.body)
      }
      catch (err) {
        console.log(`🙈🔥 Unable to update ${req.body.name} 🔥🙈`)
        console.error(`🙈🔥 ${err} 🔥🙈`)
      }
    })

    // -----------------------
    // DELETE Route for deleting a recipe.
    this.app.delete('/recipes', async (req, res) => {
        try {
          const deleteResult = await this.recipeCollection.deleteOne({ name: req.body.name })
          if (deleteResult.acknowledged) {
            console.log(`Deleted recipe: ${req.body.name}`)
            res.send(req.body)
          }
          else {
            console.error(`🙈🔥 Unable to delete ${req.body.name}. Deletion was not acknowledged by MongoDB.`)
            res.send('🙈🔥 Unable to delete! 🔥🙈')
          }
        }
        catch (err) {
          console.error(`🙈🔥 Unable to delete ${req.body.name} 🔥🙈`)
          console.error(`🙈🔥 ${err} 🔥🙈`)
        }
    })

    // -----------------------
    // Route for bad requests.
    this.app.all('*', (req, res) => {
      console.error(`🙈🔥 Bad ${req.method} request from ${req.ip} ==> ${req.url} 🔥🙈`)
      console.log(req.body)
      res.send('🐡 404 🐡')
    })
  }

  // ----------------------------------------------------------------------------
  // Returns a promise that resolves to a MongoDB client.
  async #setupMongoDBConnection() {
    return new Promise((resolve, reject) => {
      let client
      try {
        client = new MongoClient(this.#credentialsURI, this.#mongoClientSetup)
      }
      catch (err) {
        console.log(`🙈🔥 Problem creating mongoDB client. Check URL, or credentials: ${err} 🔥🙈`)
        reject(err)
      }
      resolve(client)
    })
  }

  // ----------------------------------------------------------------------------
  // Establish connection to mongoDB and get our database, collections and
  // document count.
  async createMongoConnection() {
    this.MongoClient = await this.#setupMongoDBConnection()

    try {
      await this.MongoClient.connect()
      console.log('🦆 Connected to MongoDB Cloud! 🦆')
      this.db = this.MongoClient.db(this.recipeDB)
      this.recipeCollection = this.db.collection(this.recipeDB)

      this.docCount = await this.recipeCollection.countDocuments({})
      console.log(`🦆 Document count: ${this.docCount} 🦆`)
    }
    catch (err) {
      console.log(`🙈🔥 Problem connecting to mongoDB: ${err} 🔥🙈`)
    }
    finally {
      // console.log('🦍 Closing connection to MongoDB Cloud')
      // client.close()
    }
  }

  // ----------------------------------------------------------------------------
  // Function to use as middleware to log request sources.
  requestLogger(req, res, next) {
    console.log(`🐡 Request from ${req.ip} ==> ${req.url} 🐡`)
    // Moves onto the next middleware function.
    next()
  }

  // ----------------------------------------------------------------------------
  // Sanitize an input json query body by trimming all values and converting to lowercase.
  sanitizeRequestQueryBody(query) {
    for (const key in query.body) {
        query.body[key] = query.body[key].trim().toLowerCase()
    }
    return query
  }

  // ----------------------------------------------------------------------------
  // Wait for the recipeCollection object to be ready before continuing.
  async waitForCollection(response) {
    // We can run the situation of no collection being ready if client is
    // making a request while the server and database connection are still initializing.
    while (this.recipeCollection === null && this.retryCount < this.retryLimit) {
      this.retryCount++
      console.log(`🙈 Waiting for MongoDB connection to be ready. Retry attempt ${this.retryCount} 🙈`)
      await wait(this.retryDelayMs)
    }

    if (this.retryCount >= this.retryLimit) {
      this.retryCount = 0
      console.log(`🙈🔥 Problem connecting to mongoDB. Retry limit reached. 🔥🙈`)
      response.status(500).send('🙈🔥 The server timed out when trying to connect to the database. Please try again! 🔥🙈')
    }
    else {
      this.retryCount = 0
    }
  }
}


// --------------------------------------------------------------------
// Start the server
const server = new ExpressServer()
server.startServer()
server.createMongoConnection()