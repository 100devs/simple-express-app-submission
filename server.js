const express = require('express')

const myApplication = express()

const portNumber = 5000
myApplication.listen(portNumber, function () {
    console.log(`listening on ${portNumber}`)
})


console.log("May the force be with you")
