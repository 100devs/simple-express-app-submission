const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = process.env.PORT || 9000
require('dotenv').config()

let dbName = 'habitTracker'
let dbConnectionStr = process.env.DB_STRING

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

MongoClient.connect(dbConnectionStr)
   .then(client => {
      console.log(`Connected to ${dbName} Database`)
      const db = client.db(dbName)
      const habitsCollection = db.collection('habits')

      app.get('/', (req, res) => {
         habitsCollection.find().toArray()
            .then(results => {
               res.render('index.ejs', { habits: results })
            })
      })

      app.post('/createHabit', (req, res) => {
         const habitName = req.body.habitName.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')

         habitsCollection.insertOne({ habitName: habitName, daysCompleted: 0 })
            .then(result => {
               console.log(result)
               res.redirect('/')
            }).catch(err => {
               console.log(err)
            })
      })

      app.put('/updateHabit', (req, res) => {
         habitsCollection.findOneAndUpdate({ habitName: req.body.habit, daysCompleted: req.body.days }, {
            $set: {
               daysCompleted: req.body.days + 1
            }
         })
            .then(result => {
               console.log('Added Day')
               res.json(result.value)
            })
            .catch(error => console.error(error))
      })

      app.delete('/deleteHabit', (req, res) => {
         habitsCollection.findOneAndDelete({ habitName: req.body.habit })
            .then(result => {
               console.log('Habit deleted')
               res.json(result.value)
            })
            .catch(error => console.error(error))
      })
   })

app.listen(PORT, _ => console.log(`Server is running on ${PORT}`))