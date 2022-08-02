const express = require('express');
const cors = require('cors');
const { response } = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express()
require('dotenv').config()
const dbConnectionString = process.env.DB_STRING

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to db')
        const db = client.db('pet_data');
        const petsCollection = db.collection('pet_info')
        app.set('view engine','ejs')
        app.use(express.static(__dirname + '/public'))
        app.use(express.urlencoded({extended:true}))
        app.use(express.json())
        app.use(cors())

        app.get('/', (req, res) => {
            db.collection('pets').find().toArray()
            .then(pets => {
                res.render('index.ejs', { pets: pets })
            })
            .catch(error => console.error(error))
        })
        app.post('/pets', (req, res) => {
        petsCollection.insertOne(req.body)
            .then(result=> {
                res.redirect('/')
            })
            .catch(error=> console.error(error))
        })
        app.listen(process.env.PORT || PORT, ()=>{
            console.log(`Server is online`)
        }) 
// app.put('/pets', (req, res) => {
// petsCollection.findOneAndUpdate(
//     { name: 'Yoda' },
//     {
//         $set: {
//         name: req.body.name,
//         quote: req.body.quote
//         }
//     },
//     {
//         upsert: true
//     }
// )
// .then(result => {e
//     res.json('Success')
//     })
// .catch(error => console.error(error))
// })
//   app.delete('/pets', (req,res) => {
//     petsCollection.deleteOne(
//         { name: req.body.name }
//     )
//     .then(result => {
//       if (result.deletedCount === 0) {
//           return res.json('No quote to delete')
//       }
//       res.json(`Deleted Darth Vader's quote`)
//      })
//     .catch(error => console.error(error))
//   })
})