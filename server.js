const { response } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/database')
const homeRoutes = require('./routes/homeRoutes')
const wordRoutes = require('./routes/wordRoutes')
require('dotenv').config({path: './config/.env'})
//connect to database

connectDB()

const db = mongoose.connection


app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/word', wordRoutes)

app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`)
})