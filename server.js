const express = require('express')
const { default: mongoose } = require('mongoose')
const dotenv = require('dotenv')
const Todos = require("./models/todo")
const { TopologyDescription } = require('mongodb')

const app = express()
const PORT = 8000

dotenv.config()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('MongoDb Connected')
        })
        .catch(err => console.log(err))
//GET
app.get("/", async (req, res) =>{
    try{
       Todos.find({}, (err, tasks) => {
        res.render('index.ejs', {todos: tasks})
       })
    } catch(err) {
        if(err) return res.status(500).send(err)
    }
})

//POST a food
app.post('/', async (req, res) =>{
    const todos = new Todos(
        {
            title: req.body.title,
            content: req.body.content,
            calories: req.body.calories
        }
    )
    try{
        await todos.save()
        console.log(todos);
        res.redirect('/')

    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect("/")
    } 
})

//UPDATE
app.route("/edit/:id")
    .get((req,res) =>{
        const id = req.params.id
        Todos.find({}, (err, tasks) =>{
            res.render("edit.ejs", { todos: tasks, todosId: id })
        })
    })
    .post((req, res) =>{
        
            const id = req.params.id
            Todos.findByIdAndUpdate(
                id, 
                {
                    title: req.body.title,
                    content: req.body.content,
                    calories: req.body.calories
                },
            
                (err) => {
                    if (err) return res.status(500).send(err)
                    res.redirect("/")
                })
        
    })

//DELETE
app.route('/remove/:id')
    .get((req, res) =>{
        const id = req.params.id
        Todos.findByIdAndRemove( id, err => {
            if (err) return res.send(500, err)
            res.redirect('/')
        })
    })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})