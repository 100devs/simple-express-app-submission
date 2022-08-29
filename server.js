const express = require('express')
const { env } = require('process')
const app = express()
const PORT = 7787
const mongoose = require('mongoose')
require('dotenv').config()



// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
const tbrBooks = require('./models/tbrBooks')


// DB connection
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => { console.log('Connected to database!') })


// GET/READ METHOD
app.get('/', async (req, res) => {
    try {
        tbrBooks.find({}, (err, books) => {
            res.render('index.ejs', { bookListItems: books })
        })
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

// POST/CREATE METHOD
app.post('/', async (req, res) => {
    const book = new tbrBooks(
        {
            title: req.body.title,
            author: req.body.author
        }
    )
    try {
        await book.save()
        console.log(book)
        res.redirect('/')
    } catch (err) {
        if (err) return res.status(500).send(err)
    }
})

// UPDATE 
app.put('/markreading/:id', (req, res) => {
    tbrBooks.findByIdAndUpdate({ thing: request.body.bookListItems }, {
        $set: {
            reading: true
        }
    }, {
        sort: { _id: -1 },
        upsert: false
    })
        .then(result => {
            console.log('Reading')
            response.json('Reading')
        })
        .catch(error => console.error(error))
})

// DELETE 
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        tbrBooks.findByIdAndRemove(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })
// PORT 
app.listen(PORT, () => console.log(`Server running on ${PORT}`))