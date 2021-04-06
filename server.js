const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb')
const { response, request } = require('express')
const { resolveInclude } = require('ejs')

require('dotenv').config()

const PORT = 3000


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine', 'ejs')

const password = "demo"

let db,dbconnector = process.env.DB_STRING,
    dbName="Playlist"

const data = {

    item: "Something to do",
    priortit:0
}

MongoClient.connect(dbconnector, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connect to ${dbName}`)
        db = client.db(dbName)
    })


app.get('/', (request,response) => {

    db.collection('toDoList').find().toArray()
    .then(data =>{

        console.log(data)
        response.render('index.ejs',{info:data})     
    })

    //response.sendFile(__dirname + "/index.html")    
   
})

app.post('/addList', (req,res)=>{

    const task = req.body.toDo

    const data = {
        toDo: task,
        priority: 0
    }
    db.collection('toDoList').insertOne(data)
        .then(result =>{
            console.log('Task Added')
            res.redirect('/')
        })

})

app.put('/upvote', (req, res) =>{

    //let priorityS = parseInt(req.body.priorityS) 
    console.log(req.body.priorityS)
    db.collection('toDoList').updateOne({toDo:req.body.toDoS, priority: req.body.priorityS}, {
        $set: {priority: req.body.priorityS + 1}
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result =>{
        console.log("UpVote")
        res.json("UpVote")})
    .catch(error => console.log(error))
})


app.put('/downVote', (req,res)=>{

    //let priorityS = parseInt(req.body.priorityS) 
    console.log(req.body.priorityS)
    db.collection('toDoList').updateOne({toDo:req.body.toDoS, priority: req.body.priorityS}, {
        $set: {priority: req.body.priorityS - 1}
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result =>{
        console.log("DownVote")
        res.json("DownVote")})
    .catch(error => console.log(error))

})

app.delete('/deleteTask', (req,res) =>{
    
    
    db.collection('toDoList').deleteOne(req.body)
    .then(result =>{
        res.json('Deleted')
    })
    .catch(error => console.log(error))
})


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server Running on ${PORT}`)
})