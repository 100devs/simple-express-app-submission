const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'recipeDB'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('recipes').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
        // console.log(data)
    })
    .catch(error => console.error(error))
})

app.post('/addRecipe', (request, response) => {
    
    let ingredientArr = request.body.recipeIngredient;

    console.log(request.body.recipeName)
    console.log(ingredientArr)
    console.log(typeof ingredientArr)


    //What happens if I don't put in an array? 

    ingredientArr = ingredientArr.filter((value) => {
        if(value != null || value != undefined || value != "" || value != " "){
            return value
        }
    })

    db.collection('recipes').insertOne({recipeName: request.body.recipeName,
    recipeIngredients: ingredientArr, likes: 0})
    .then(result => {
        // console.log(result)
        console.log('Recipe Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {

    console.log(request.body.recipeIngredientS)

    db.collection('recipes').updateOne({recipeName: request.body.recipeNameS, recipeIngredients: request.body.ingredientNameS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.put('/updateRecipe', (request, response) => {

    console.log(request.body.recipeIngredientS)

    db.collection('recipes').updateOne({recipeName: request.body.recipeNameS, recipeIngredients: request.body.ingredientNameS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteRecipe', (request, response) => {
    db.collection('recipes').deleteOne({recipeName: request.body.recipeNameS, recipeIngredients: request.body.ingredientNameS})
    .then(result => {
        console.log('Recipe Deleted')
        response.json('Recipe Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}. Connect to localhost:2121`)
})