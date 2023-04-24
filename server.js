const express = require("express")

const myApplication = express()

const portNumber = 5000
myApplication.listen(portNumber, function () {
  console.log(`listening on ${portNumber}`)
})

// myApplication.get(endpoint, callback)
myApplication.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html")
  console.log(__dirname)
})
