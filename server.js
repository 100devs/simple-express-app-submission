// variables

const express = require('express')
const app = express()
const PORT = 8000
const mongoose = require('mongoose')
const ModelName = require('./models/myModel')
require('dotenv').config()

//Middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// Connection to mongodb

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => {console.log('Connected to database')}
  )

// GET items and render to main index.ejs

app.get('/', async (request, response) => {
  try {
    ModelName.find({}, (err, items) => {
      response.render("index.ejs", {
        itemsList: items
      })
    })
  } catch (err) {
    if(err) return response.status(500).send(err)
  }
})

// POST new items to db collection

app.post('/', async (request, response) => {
  const newItem = new ModelName(
    {
      title: request.body.title,
      content: request.body.content
    }
  )
  console.log(newItem)
  try {
    await newItem.save()
    console.log(newItem)
    response.redirect("/")
  } catch (err){
    if (err) return response.status(500).send(err)
    response.redirect('/')
  }
})

app
  .route("/edit/:id")
  .get((request, response) => {
    const id = request.params.id
    ModelName.find({}, (err, items) => {
      response.render("edit.ejs", {
        itemsList: items,
        itemId: id
      })
    })
  })
  .post((request, response) => {
    const id = request.params.id
    ModelName.findByIdAndUpdate(
      id,
      {
        title: request.body.title,
        content: request.body.content
      },
      err => {
        if (err) return response.status(500).send(err)
        response.redirect("/")
      })
  })

app
  .route("/remove/:id")
  .get((request, response) => {
    const id = request.params.id
    ModelName.findByIdAndRemove(id, err => {
      if(err) return response.status(500).send(err)
      response.redirect("/")
    })
  })

app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
