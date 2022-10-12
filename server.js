const express = require('express')
const app = express()
const PORT = 8100
const mongoose = require('mongoose')
require('dotenv').config()
const Nickname = require('./models/nickname')

// Middleware
app.set('viewengine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect(process.env.DB_STRING, {
    useNewUrlParser: true
}, () => {
    console.log('Connected to database')
})

// Read existing items
app.get('/', async (req, res) => {
    try {
        Nickname.find({}, (err, names) => {
            res.render('index.ejs', {
                nicknames: names
            })
        })
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})

// Create new item
app.post('/', async (req, res) => {
    const nickname = new Nickname({
        source: req.body.source,
        name: req.body.name
    })

    try {
        await nickname.save()
        res.redirect('/')
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})

// Update selected item
app
    .route('/update/:id')
    .get((req, res) => {
        const id = req.params.id

        Nickname.find({}, (err, names) => {
            res.render('update.ejs', {
                nicknames: names,
                idName: id
            })
        })
    })
    .post((req, res) => {
        const id = req.params.id

        Nickname.findByIdAndUpdate(
            id, {
                source: req.body.source,
                name: req.body.name
            },
            err => {
                if (err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

// Delete selected item
app
    .route('/delete/:id')
    .get((req, res) => {
        const id = req.params.id

        Nickname.findByIdAndDelete(id, err => {
            if (err) return res.status(500).send(err)
            res.redirect('/')
        })
    })

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))