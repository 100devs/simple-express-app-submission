//Why isn't it letting me use es6? 
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const path = require('path')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//connect to db
const PORT = 8000
mongoose.connect(process.env.MONGO_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.listen(process.env.PORT || PORT, () => console.log(`Listening on port ${PORT}`))
    }).catch((error) => console.log(error))
    
//routes
const recipeRoutes = require('./Routes/recipeRoutes')
const userRoutes = require('./Routes/userRoutes')
const imageRoutes = require('./Routes/imageRoutes')

//route usage

app.use('/recipes', recipeRoutes)
app.use('/users', userRoutes)
app.use('/images', imageRoutes)

//serve static assets
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
    })
}