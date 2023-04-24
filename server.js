const express = require("express")

const myApplication = express()

const portNumber = 5000
myApplication.listen(portNumber, function () {
  console.log(`listening on ${portNumber}`)
})

// myApplication.get(endpoint, callback)
myApplication.get("/", (request, response) => {
  response.send("Hello World")
})

console.log("May the force be with you")
