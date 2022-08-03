const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config')

const PORT = process.env.PORT

const HeroSchema = mongoose.Schema({
    name: String,
    nickname: String
})

const Heroes = mongoose.model('Hero', HeroSchema)

const app = express()
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(bodyParse.urlencoded({}))
connectDB()

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/api', async (req,res) => {
    try{
        const allHeroes = await Heroes.find()
        res.status(200).json(allHeroes)
    } catch(error){
        throw new Error(error)
    }
})

app.post('/api', async(req, res) => {
    console.log(req.body)
    try{
        const hero = await Heroes.create({
            name: req.body.name,
            nickname: req.body.nickname,
        })
        res.status(200).json(hero)
    } catch(error){
        throw new Error(error)
    }
})

app.put('/api/:name', async (req, res) => {
    const hero = await Heroes.findOne({name: req.params.name})
    if(!hero){
        res.status(400)
        throw new Error('Hero not found')
    }

    const updatedHero = await Heroes.findOneAndUpdate({ name: req.params.name}, {
        name: req.body.name,
        nickname: req.body.nickname,
    })

    res.status(200).json(updatedHero)
})

app.delete('/api/:name', async(req, res) => {
    const hero = await Heroes.findOne({name: req.params.name})
    if(!hero){
        res.status(400)
        throw new Error('Hero not found')
    }

    await Heroes.findOneAndDelete({ name: req.params.name})

    res.status(200).json({name: req.params.name})
})

app.listen(PORT, () => {
    console.log(`Server running at `.blue + `http://localhost:${PORT}`.underline.cyan)
})