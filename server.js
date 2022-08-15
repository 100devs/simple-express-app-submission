//Variables

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const PORT = 3000

//Middlewares

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

//Connect DB

mongoose.connect(process.env.DB_CONNECTION_STRING, {}, () => {
    console.log('Connected database')
})


//Routes

app.get("/", async (req, res) => {
    try {
        res.render('index.ejs')
    } catch (error) {
        console.log(error)
    }
})




app.listen(process.env.PORT || PORT, () => {
    console.log(`listening on port ${PORT}`)
})