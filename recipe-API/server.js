const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const recipes = require('./recipe-json')

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'), () => console.log(`Server responding...`))
})

//get all recipes json api
app.get('/api/recipes', (req, res) => {
    res.json(recipes)
})

//get recipe by name json api
app.get('/api/recipes/:recipeName', (req, res) => {
    const recipeName = req.params.recipeName.toLowerCase()
    if (recipes[recipeName]){
        res.json(recipes[recipeName])
    } else {
        res.status(404).end()
    }
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))