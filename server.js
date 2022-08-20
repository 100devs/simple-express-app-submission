const express = require('express')
const app = express()
const connectDB = require('./config/database')

//routes
const homeRoutes = require('./routes/home')
const logRoutes = require('./routes/log')

require('dotenv').config({path: './config/.env'})
connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//routes
app.use('/', homeRoutes)
app.use('/log', logRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})