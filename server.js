//declare initial variables
const express = require('express')
const app = express()
const PORT = 9500
const mongoose = require('mongoose') //require mongoose
require('dotenv').config() //require dotenv
//add model variables
const TodoTask = require('./models/todotask')


//middlewares
app.set('view engine', 'ejs') //using ejs(templating language) to spit out html
app.use(express.static('public')) //letting express() find files in the public folder
app.use(express.urlencoded({extended: true})) //url parser for express() help validate the info being passed back and forth(the right kind of data). 
//extended allows us to pass more complex things such as arrays

//connecting to mongodb thru mongoose
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log('connected to db!')
}) 

//Get Method
app.get('/', async(req, res) => {
    try{
        TodoTask.find({}, (err, tasks) => {
            res.render('index.ejs', {todoTasks: tasks})
        })
    }catch(err){
        if(err) return res.status(500).send(err)
    }
})

//Post method
app.post('/', async(req, res) => {
    const todoTask = new TodoTask(
        {
            title: req.body.title,
            content: req.body.content
        }
    )
    try{
        await todoTask.save()
        console.log(todoTask)
        res.redirect('/')
    }catch(error){
        if(error) return res.status(500).send(error)
            res.redirect('/')
        
    }
})

//Edit/ Update method
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.find({}, (err, tasks) => {
            res.render('edit.ejs', {
                todoTasks:tasks, idTask: id
            })
        })
    
    })
    .post((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                content: req.body.content,
            },
            err => {
                if(err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    }) 

    
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        TodoTask.findByIdAndRemove(id, err => {
            if(err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

//listening server
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
