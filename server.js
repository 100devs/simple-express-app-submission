// Modules

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8000
const dotenv = require("dotenv");
dotenv.config()
const mongooseModel = require('./models/myModel');
const { modelName } = require('./models/myModel');
const myModel = require('./models/myModel');
console.log(mongooseModel)
// Middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// Connecting to the DB
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    () => console.log('Connected to DB')
    ) //maybe could add a .then() here that would make the thing below redundant

// Check whether the connection has succeeded or failed
const db = mongoose.connection
db.once('open', _ => {
    console.log('Database connected: Open')
})

db.on('error', err => {
    console.error('connection error:', err)
})

// Requesting parts

 app.get('/', async (request, response) => {
        try {
            mongooseModel.find({}, (err, items) => {
                response.render("index.ejs", {
                    itemsList: items
                })
            })
            
        } catch (err) {
            if (err) return response.status(500).send(err)
        }
          }) 

app.post('/', async (request, response) => {
    const newItem = new myModel(
        {
            title: request.body.title,
            content: request.body.content
        });
    try {
        await newItem.save()
        console.log(newItem)
        response.redirect('/')
    } catch(err){
        if (err) return response.status(500).send(err);
        response.redirect('/')
    }
})

app.route("/edit/:id")
    .get( (request, response) => {
        const id = request.params.id
        mongooseModel.find({}, (err, items) => {
            response.render("edit.ejs", {
                itemsList: items, itemId: id
            })
        })
    } )
    .post( (request, response) => {
        const id = request.params.id;
        mongooseModel.findByIdAndUpdate(
            id,
            {
                title: request.body.title,
                content: request.body.content
            },
            err => {
                if (err) return response.status(500).send(err)
                response.redirect('/')
            }
        )
    })
app
    .route("/remove/:id")
    .get( (request,response ) => {
        const id = request.params.id
        mongooseModel.findByIdAndRemove(
            id,
            err => {
                if (err) return response.status(500).send(err)
                response.redirect('/')
            }
        )
    })
app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))