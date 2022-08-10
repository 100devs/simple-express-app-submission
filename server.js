const express = require('express')
const https = require('https')
const fetch = require('node-fetch')
const app = express()
const PORT = 8000

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

app.post('/queryDrinks', (req, res) => {
    const queryParameter = req.body.ingredient.toLowerCase()

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${queryParameter}`)
    .then(res => res.json())
    .then(data => {
        if (data.drinks) {
          res.render('results.ejs', { info: data })
        }
        else {
          res.render('404.ejs')
        }
    })
    .catch(error => {
        console.log(error)
    })
})

app.get('/queryRandom', (req, res) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(data => {
      if (data.drinks) {
        res.render('results.ejs', { info: data })
      }
      else {
        res.render('404.ejs')
      }
  })
  .catch(error => {
      console.log(error)
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`)
})