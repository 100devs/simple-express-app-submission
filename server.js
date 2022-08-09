const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'posts'

    MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{  // request home page
    const postsItems = await db.collection('posts').find().toArray() 
    
    response.render('index.ejs', { info : postsItems }) 
    // db.collection('todos').find().toArray()
    // .then(data => {
    //     db.collection('todos').countDocuments({completed: false})
    //     .then(itemsLeft => {
    //         response.render('index.ejs', { items: data, left: itemsLeft })
    //     })
    // })
    // .catch(error => console.error(error))
})


app.post('/addPost', (request, response) => {  // post request to  /addTodo  
    db.collection('posts').insertOne({postText : request.body.postText, likes: 0})  // insert one  task to the database
    .then(result => {
        console.log('Post Added') // log "Todo Added into the console"
        response.redirect('/')  // redirecting to home page
    })
    .catch(error => console.error(error))//
})

app.put('/addOneLike', (request, response) => {
    db.collection('posts').updateOne({postText : request.body.postS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})



app.delete('/deletePost', (request, response) => {  // delete request  at  /deleteItem path 
    db.collection('posts').deleteOne({postText: request.body.postS}) // delete one document  that have the thing requested from the body
    .then(result => { // in the success of deletion 
        console.log('post Deleted') // log "todo deleted" in the console
        response.json('post Deleted')// respond with a json format that says  "Todo Deleted"
    })
    .catch(error => console.error(error)) // if an error occurred in the deletion log the error in the console

})


app.listen(process.env.PORT || PORT, ()=> {
    console.log(`the server is running on port ${PORT}`)
})

