const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 1234

let db,
    dbConnectionStr = 'mongodb+srv://Mario:Cooljamz0424!@cluster0.r5du9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    dbName = '100devstracker'

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
    db.collection('contacts').find().toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addContact', (request, response) => {
    db.collection('contacts').insertOne(request.body)
    .then(result => {
        console.log('Contact Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.delete('/deleteContact', (request, response) => {
    db.collection('contacts').deleteOne(request.body)
    .then(result => {
        console.log('Contact Deleted')
        response.json('Contact Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})