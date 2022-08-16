//Variables

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const methodOverride = require('method-override')
const PORT = 3000
const Note = require('./models/Note')

//Middlewares

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//Connect DB

mongoose.connect(process.env.DB_CONNECTION_STRING, {}, () => {
    console.log('Connected database')
})


//Routes

//Get all notes
app.get("/", async (req, res) => {
    try {
        const notes = await Note.find({}).lean()
        res.render('index.ejs', { notes })
    } catch (error) {
        console.log(error)
    }
})

//Go to the new note page
app.get("/add", (req, res) => {
    try {
        res.render('newNote.ejs')
    } catch (error) {
        console.log(error)
    }
})

//Go to the edit page
app.get('/edit/:id', async (req, res) => {
    try {
        const note = await Note.findOne({_id: req.params.id})
        res.render('edit.ejs', { note })
    } catch (error) {
        console.log(error)
    }
})

//Make new note
app.post('/add', async (req, res) => {
    try {
        const newNote = await Note.create({title: req.body.title, content: req.body.content})
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

//Edit the note in the database
app.put('/edit/:id', async (req, res) => {
    try {
        await Note.findByIdAndUpdate(req.params.id, {title: req.body.title, content: req.body.content})
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

//Delete a note
app.delete('/deleteNote/:id', async (req, res) => {
    try {
        await Note.findOneAndDelete({_id: req.params.id}).then(result => {
            console.log('entry deleted')
            res.json('Note deleted')
        })
    } catch (error) {
        console.log(error)
    }
})



app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`)
})