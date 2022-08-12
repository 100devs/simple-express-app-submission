const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1111
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'palette'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    console.log(`Connected to ${dbName} Database`)
    db = client.db(dbName)
})

//MIDDLEWARE
app.set('view engine','ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

// @desc landing page
// @route GET /
app.get('/', async(req,res)=>{
    db.collection('palette').find().toArray()
    .then(data =>{
        db.collection('palette').countDocuments({completed: false})
        .then(itemsLeft =>{
            res.render('index.ejs', {items: data, left: itemsLeft})
        })
    }).catch(error => console.error(error))
})

// @desc creating resource that will be added to color list and will be stored on mongodb
// @route POST /addColor
app.post('/addColor', (req,res)=>{
    db.collection('palette').insertOne({thing: req.body.addColor, completed: false})
    .then(result=> {
        console.log('new Color Added to 🎨')
        res.redirect('/')
    }).catch(error => console.error(error))
})

// @desc remove resource from list an db
// @route DELETE /deleteColor
app.delete('/deleteColor',(req,res)=>{
    db.collection('palette').deleteOne({thing: req.body.itemFromJS})
    .then(result =>{
        console.log('Color ❌')//color deleted
        res.json(`Color Yeeted`)
    }).catch(error => console.error(error))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})