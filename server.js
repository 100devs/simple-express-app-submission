//npm install express mongoose ejs dotenv
//npm install --save-dev nodemon

//"start": "nodemon server.js"

const express = require("express")
const app = express()
const PORT = 6900;
const mongoose = require("mongoose")
require('dotenv').config()
const JournalEntry = require('./models/journalentry')

//set middleware
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION ,
    {useNewUrlParser: true},
    () => (console.log('Connected to db!'))
)

//GET METHOD

app.get('/', async (req, res) => {
    try {
        JournalEntry.find({}, (err,entries) => {
            res.render("index.ejs", {
                journalEntries: entries
            })
        })
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

//POST
app.post('/', async (req,res) => {
    const journalEntry = new JournalEntry(
        {
            date: req.body.date,
            location: req.body.location,
            sport: req.body.sport,
            time: req.body.time,
            distance: req.body.distance,
            unit: req.body.unit
        }
    )
    try {
        await journalEntry.save()
        console.log(journalEntry)
        res.redirect('/')
    } catch(err) {
        if (err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//EDIT OR UPDATE METHOD
app
    .route("/edit/:id")
    .get((req,res) => {
        const id = req.params.id
        JournalEntry.find({}, (err,entries) => {
            res.render('edit.ejs', {
                journalEntries: entries, idEntry: id })
        })
    })
    .post((req,res) => {
        const id = req.params.id
        JournalEntry.findByIdAndUpdate(
            id,
            {
                date: req.body.date,
                location: req.body.location,
                sport: req.body.sport,
                time: req.body.time,
                distance: req.body.distance,
                unit: req.body.unit
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

//DELETE
app
    .route("/remove/:id")
    .get((req,res) => {
        const id = req.params.id
        JournalEntry.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
