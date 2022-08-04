const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'customers'

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
    db.collection('customers').find().sort({amount:-1}).toArray()
    //db.collection('customers').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addCustomer', (request, response) => {
    db.collection('customers').insertOne({firstName: request.body.firstName, lastName: request.body.lastName,
    amount: Number(request.body.amount)}) // , likes: 0
    .then(result => {
        console.log('Customer Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

// app.put('/addOneLike', (request, response) => {
//     db.collection('customers').updateOne({firstName: request.body.firstNameS, amount: request.body.amountS,likes: request.body.likesS},{
//         $set: {
//             likes:request.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         response.json('Like Added')
//     })
//     .catch(error => console.error(error))

// })



app.put('/addAmount', (request, response) => {
    console.log(request);
    db.collection('customers').updateOne({firstName:request.body.firstNameS, lastName:request.body.lastNameS, amount:request.body.amountS},{
        $set: {
            amount : request.body.addAmountS + request.body.amountS
        }
    }, {
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added Amount')
        response.json('Amount Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteCustomer', (request, response) => {
    db.collection('customers').deleteOne({lastName: request.body.lastNameS})
    .then(result => {
        console.log('Customer Deleted')
        response.json('Customer Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})