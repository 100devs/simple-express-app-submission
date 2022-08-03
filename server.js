const express = require('express')
const app = express()
const cors = require ('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = process.env.PORT || 8000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'shrinkflation-list-api'
    //collection 

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
        //collection = db.collection('items-list')
    })

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// app.get('/', async (req, res) => {
//     try {
//         db.collection('items-list').find().toArray()
//         .then(data => {
//             let nameList = data.map(item => item.itemName)
//             console.log(nameList)
//             res.render('index.ejs', {info: nameList})
//         })
//          //res.render('index.ejs')
//     } catch (error) {
//         res.status(500).send({message: error.message})
//     }
// })

//CRUD methods
app.get('/', (req, res) => {
    db.collection('items-list').find().toArray()
        .then(data => {
            // let nameList = data.map(item => item.itemName)
            // console.log(nameList)
            res.render('index.ejs', { info: data })
            //res.render('index.ejs', {info: nameList})
        })
        .catch(error => console.log(error))
})

app.post('/api', (req, res) => {
    console.log('Post heard')
    db.collection('items-list').insertOne({itemName: req.body.itemName, price: req.body.price}
    )
    .then(result => {
        console.log(result)
        res.redirect('/')
    })
})

app.put('/updateEntry', (req, res) => {
    console.log(req.body)
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
            delete req.body[key]
        }
    })
    console.log(req.body)
    db.collection('items-list').findOneAndUpdate(
        {itemName: req.body.itemName},
        {
            $set: req.body
        }
    )
    .then(result => {
        console.log(result)
        res.json('Success')
    })
    .catch(err => console.error(err))
})

app.delete('/deleteEntry', (req, res) => {
    db.collection('items-list').deleteOne(
        {itemName: req.body.itemName}
    )
    .then(result => {
        console.log('Entry deleted')
        res.json('Entry Deleted')
    })
    .catch(err => console.error(err))
})



app.listen(process.env.PORT || PORT, () => {
    //console.log(`Server is running on port ${PORT}`)
})