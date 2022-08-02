const express = require('express')
const figlet = require('figlet')
const morgan = require('morgan')
const app = express()

let data = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

morgan.token("body", (req, res) => req.method == "POST" ? `{"name":"${req.body.name}","number":"${req.body.number}"}` : "")

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.set("view engine", "ejs")

app.get("/info", (request, response) => {
  response.render("info.ejs", { count: data.length, date: new Date().toString() })
})
app.get("/api/persons", (request, response) => {
  response.json(data)
})
app.get("/api/persons/:id", (request, response) => {
  const person = data.find(e => e.id == request.params.id)
  if (person) response.json(person)
  else figlet(`404!! - User ID ${request.params.id} not found`, (err, data) => {
    if (err) {
      console.log("error with figlet")
      console.dir(err)
    } else {
      response.status(404).send("<pre>" + data + "</pre>")
    }
  })
})

app.post("/api/persons", (request, response) => {
  if (!request.body.name) {
    response.status(400).json({ error: "needs name" })
  } else if (!request.body.number) {
    response.status(400).json({ error: "needs number" })
  } else if (data.some(e => e.name == request.body.name)) {
    response.status(400).json({ error: "name must be unique" })
  } else {
    const newEntry = { id: Math.floor(Math.random() * 65535), name: request.body.name, number: request.body.number }
    data.push(newEntry)
    response.json(newEntry)
  }
})

app.delete("/api/persons/:id", (request, response) => {
  data = data.filter(e => e.id != request.params.id)
  response.sendStatus(204)
})

const PORT = 3001

module.exports = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
}) // for testing
