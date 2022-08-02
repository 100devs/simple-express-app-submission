const express = require('express')
const app = express()
const PORT = 3000
require('dotenv').config()
const fetch = require('node-fetch')




// set view engine to ejs
app.set('view engine', 'ejs')

// MIDDLEWARE
// parses incoming requests with urlencoded payloads based on body-barser
app.use(express.urlencoded( {extended: true} ))
// serves the static files in the 'public' directory. Gives other files access to them.
app.use(express.static('public'))
// parses incoming requests with JSON payloads based on body-parser
app.use(express.json())

// begin making http requests below
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.post('/recipe', (req, res) => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&cuisine=${req.body.wantedCuisines}&excludeCuisine=${req.body.unwantedCuisines}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const randomNum = Math.floor(Math.random() * data.results.length)
            const recipeId = data.results[randomNum].id
            fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}`)
                .then(response => response.json())
                .then(data => {
                    res.json(data)
                })
        })
})



// establishes what port to run on 
app.listen(process.env.PORT || PORT, _ => {
    console.log(`Listening on ${PORT}`)
})