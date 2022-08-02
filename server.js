const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient



require('dotenv').config()

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'genshin-impact',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to Database')
        db = client.db(dbName)
        collection = db.collection('characters')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())




app.get('/', (request, response) => {
    db.collection('characters').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))

})

app.post('/addCharacter', (request, response) => {
    db.collection('characters').insertOne({name: request.body.name, element: request.body.element, rarity: request.body.rarity, region: request.body.region})
    .then(result => {
        console.log('Character Added')
        response.redirect('/') //redirect main page, so it refreshes
    })
    .catch(error => console.error(error))
})


app.get('/api/:characterName', (request, response) => {
    const nameParam = request.params.characterName.toLowerCase()
        db.collection('characters').find({ name: nameParam}).toArray()
        .then(results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))
})



app.delete('/deleteCharacter', (request, response) => {
    db.collection('characters').deleteOne({name: request.body.nameS})
    .then(result => {
        console.log('Character Deleted')
        response.json('Character Deleted')
    })
    .catch(error => console.error(error))
})


app.put('/addOneLike', (request, response) => {
    //find a match
    db.collection('characters').updateOne({name: request.body.nameS, likes: request.body.likesS}, {
        $set: {
            likes:request.body.likesS + 1 //set likes to whatever it was, plus 1
        }
    },{
        sort: {_id: -1}, // if theres several of same, update first one
        upsert: false // if it doesnt exist
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.`)
})


