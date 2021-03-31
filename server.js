const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 8000

let db,
    dbConnectionStr = 'mongodb+srv://catch:yUMkutkhULH5rPVb@cluster0.0b6e3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName = 'grocery-stock'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('groceries').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addItem', (req, res) => {
    db.collection('groceries').insertOne(req.body)
    .then(result => {
        console.log('Item added')
        res.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/removeItem', (req, res) =>{
    db.collection('groceries').deleteOne({ name: req.body.nameS })
    .then(result => {
        console.log('Item Deleted')
        res.json('Item Deleted')
    })
    .catch (error => console.error(error))
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Listening on port ${PORT}`)
})
