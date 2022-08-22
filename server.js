// delcare variables that we need for back-end
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8500;
require('dotenv').config();
const TodoTask = require('./models/todo');



// set middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));


mongoose.connect(process.env.DB_CONNECTION,
  {useNewUrlParser: true},
  () => {console.log('Connected to DB!')}
);

//GET METHOD
app.get('/', async (req, res) => {
  try {
    TodoTask.find({}, (err, tasks) => {
      res.render('index.ejs', {
        todoTasks: tasks
      })
    })
  } catch (error) {
    res.status(500).send({message: error.message});
  }
})

// POST METHOD
app.post('/', async (req,res) => {
  const addedTask = new TodoTask(
    {
      title: req.body.title,
      content: req.body.content
    }
  )
  try {
    await addedTask.save()
    console.log(addedTask)
    res.redirect('/')
  } catch(err) {
    if (err) return res.status(500).send(err)
    res.redirect('/')
  }
});

// EDIT / UPDATE METHOD
app
  .route('/edit/:id')
  .get((req,res) => {
    const id = req.params.id;
    TodoTask.find({}, (err,tasks) => {
      res.render('edit.ejs', { todoTasks: tasks, idTask: id });
    });
  })
  .post((req,res) => {
      const id = req.params.id
      TodoTask.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          content: req.body.content
        },
        err => {
          if(err) return res.status(500).send(err)
          res.redirect('/')
        });
      })

app
    .route("/remove/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

app.listen(process.env.PORT || PORT, () => console.log(`Server is running on port ${PORT}`));
