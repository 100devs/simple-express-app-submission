//To Do: Make Delete route 

console.log('Sweet, Node is running')
//setup dependancies 
const express = require('express')
const app = express()
const cors = require('cors')
// const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')
require('dotenv').config()
const NetdesignerTask = require('./models/netdesignerTask')

//variables
let db,     
    dbConnectionString = process.env.DB_STRING,
    dbName = 'NetdesignerWoesDemo',
    collection

//Middlewares 
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//connect to db
mongoose.connect(dbConnectionString,{useNewUrlParser: true},
    () => {console.log('Connected to Database');}
    )


//Routes
//GET or READ METHOD
app.get('/', async (req, res) => {
    try {
        NetdesignerTask.find({},(error,tasks)=>{
            res.render('index.ejs',{
                netdesignerTasks: tasks
            });
        });
    } catch (error) {
        if(error)res.status(500).send({message: error.message})
    }
})

//POST or CREATE METHOD
app.post('/', async (req,res) => {
    const netdesignerTask = new NetdesignerTask( 
        {
            name: req.body.name,
            issue: req.body.issue,
            wishes: req.body.wishes,
            actionTaken: req.body.actionTaken,
            solution: req.body.solution
        }
    )
    try{
        await netdesignerTask.save()
        console.log(netdesignerTask)
        res.redirect('/')
    } catch (error){
        if(error)res.status(500).send({message: error.message})
        res.redirect('/')
    }
})

//EDIT or UPDATE METHOD
app
    .route('/edit/:id')
    .get((req,res) => {
        const id = req.params.id;
        NetdesignerTask.find({},(error,tasks) => {
            res.render('edit.ejs', {
                netdesignerTasks: tasks, idTask: id});
        });
    })
    .post((req,res) => {
        const id = req.params.id;
        NetdesignerTask.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                issue: req.body.issue,
                wishes: req.body.wishes,
                actionTaken: req.body.actionTaken,
                solution: req.body.solution
            },
            error => {
                if(error)res.status(500).send({message: error.message})
                res.redirect('/');
            });
    });

//DELETE 
app
    .route('/remove/:id')
    .get((req,res) => {
        const id = req.params.id;
        NetdesignerTask.findByIdAndRemove(id,error =>{
            if(error)res.status(500).send({message: error.message})
            res.redirect('/');
        })
    })
//setup listening port 
app.listen(process.env.PORT || 3000, () => {
    //check that your server is running during development
    console.log(`Server is running on port ${process.env.PORT}`)
})
