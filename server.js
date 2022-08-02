//Declare variables
const express = require('express')
const app = express()
const PORT = 8500 ;
const mongoose = require('mongoose')

require('cors')

require('dotenv').config() //hide things from user in connected file

//add model variable here
const TodoTask = require('./models/todotask')

//set middleware
app.set('view engine', 'ejs')
//store css and connect to server (public folder)
app.use(express.static('public'))
//url parser - encoding
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser : true},
    ()=> {console.log('Connected to database')}
    )

//Link ejs pages and render them
app.get('/', async(request, response) => {
    try{
        TodoTask.find({}, (error, tasks) => {
            response.render('index.ejs', {todoTasks: tasks})
        })
    }catch (error) {
        response.status(500).send({message: error.message})
    }
})

//POST
app.post('/', async (req, res) =>{
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
         
    )
    try {
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }
    catch (err) {
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})


//Edit and/or Update method
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err,tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask:id })
        })
    })
    .post((req, res) => {
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
            }
        )
    })


//Delete

app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

//start PORT
app.listen(process.env.PORT || PORT , () => console.log(`Server is running on port ${PORT}`))