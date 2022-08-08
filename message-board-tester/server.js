const express = require('express')
const app = express()
const PORT = 3000

app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
//remember to add object to grab by unique object
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


connectionString = process.env.MONGODB_URI;
MongoClient.connect(connectionString, {useUnifiedTopology: true})
.then(client => {
    console.log('connected to DB')
    const db = client.db('message-board-communications')
    const messageCollection = db.collection('message')

    app.put('/put',(request,response)=>{
        db.collection('message').updateOne({_id: ObjectId(request.body.apple)},{
            $set: {likes: request.body.variableForLike + 1}
        })
        .then(result =>{
            response.json('update successful')
        })
        .catch(err=>{
            console.log(`could not update ${err}`)
        })
    })
    //renders the new.ejs page
    app.get('/new',(request,response)=>{
        response.render('new.ejs')
    })
    //initial request to grab the likes and then loads tha data to the index.ejs
    app.get('/',(request, response)=>{
        db.collection('message').find().sort({likes: -1}).toArray()
        .then(result=>{
            response.render('index.ejs',{data: result})
        })
    });

    app.delete('/delete',(request, response)=>{
        db.collection('message').deleteOne({_id: ObjectId(request.body.apple)})
        .then(result =>{
            response.json('message deleted')
        })
        .catch(err=>{
            console.log(err)
        })
    })

    app.post('/messages',(request, response)=>{
        db.collection('message').insertOne({title: request.body.title, message: request.body.message, userName: request.body.userName, likes: 0})
        .then(result => {
            console.log(result)
            response.redirect('/')
        })
        .catch(err =>{
            console.log(err)
        })
    })
})
.catch(err =>{
    console.log(err)
})






app.listen(process.env.PORT ||PORT,()=>{
    console.log(`The server is running on PORT ${PORT}. You better go catch it.`)
})