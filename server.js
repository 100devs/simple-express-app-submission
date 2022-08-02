const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'games'


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
.then(client => {
    // let the user know connection to the DB is successful
    console.log(`Connected to ${dbName} Database`)
    // store your whole database into a variable
    db = client.db(dbName)
})

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// READ
app.get('/', async (req, res) => {
    try{
        const games = await db.collection(dbName).find().sort({gameName: 1}).toArray()
        res.render('index.ejs', {gameName: games})
    }
    catch (err){
        console.log(err)
    }
})

//CREATE
app.post('/addGames', async (req, res) => {
    try{
        db.collection(dbName).insertOne({
            gameName: req.body.gameName, 
            completion: false,
        })
        res.redirect('/')
    }
    catch(err){
        console.log(err)
    }
})

//UPDATE move item to completion
app.put('/markComplete', async (req,res) => {
    try{
        const data = await db.collection(dbName).updateOne(
            {gameName: req.body.gameToUpdate},
            {$set: {
                completion: true,
            }})
            console.log('Updated')
            res.json('Marked complete')
        }
        catch(err){
            console.log(err)
        }
})

//UPDATE move item back to unplayed
app.put('/replayGame', async (req,res) => {
    try{
        const data = await db.collection(dbName).updateOne({
            gameName: req.body.gameToReplay},
            {
                $set: {
                    completion: false,
                }
            })
        console.log('Updated')
        res.json('Marked uncomplete')
    }
    catch(err){
        console.log(err)
    }
})

//DE LAY TAY
app.delete('/delaytayItem', async (req, res) => {
    await db.collection(dbName).deleteOne({gameName: req.body.gameToDelaytay})
    res.json('Game delaytayed')
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})



