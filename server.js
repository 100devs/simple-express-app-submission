// Declare variables
const express = require('express')
const app = express()
const PORT = 8000
const mongoose = require('mongoose')

// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

require('dotenv').config()

const TodoTask = require('./models/TodoTask')

//Connect to Mongo
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connected to db!')
})
// GET METHOD
app.get('/', (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render('index.ejs', { todoTasks: tasks })
    })
  } catch (err) {
    if (err) return res.status(500).send(err)
  }
})

// POST METHOD
app.post('/', async (req, res) => {
  const todoTask = new TodoTask({
    title: req.body.title,
    content: req.body.content,
  })

  try {
    await todoTask.save()
    res.redirect('/')
  } catch (err) {
    if (err) return res.status(500).send(err)
    res.redirect('/')
  }
})

// EDIT or UPDATE METHOD
app
  .route('/edit/:id')
  .get((req, res) => {
    const { id } = req.params

    TodoTask.find({}, (err, tasks) => {
      res.render('edit.ejs', { todoTasks: tasks, idTask: id })
    })
  })
  .post((req, res) => {
    const { id } = req.params

    TodoTask.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      (err) => {
        if (err) return res.status(500).send(err)
        res.redirect('/')
      }
    )
  })

// DELETE
app.route('/remove/:id').get((req, res) => {
  const { id } = req.params

  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.status(500).send(err)
    res.redirect('/')
  })
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
})
