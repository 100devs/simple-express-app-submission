const express = require('express')

const app = express()
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

const PORT = process.env.port || 8000;
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')


let db,
dbconnecttionString = process.env.DB_STRING,
db_name ='car_garrage';

MongoClient.connect(dbconnecttionString)
.then(client => {
    console.log(`mongodb is connected to db ${db_name}`)
    db = client.db(db_name)
})

app.get('/', (request,response) => {
    db.collection('car_park').find().toArray().then(result => {
        response.render('index.ejs',{datas:result})
  }).catch(error => console.log(error))
  
})
app.post('/post',(request,response) =>{
    if(request.method !== 'POST'){
        response.status(405).json('Method not allowed');
    }
    db.collection('car_park').insertOne({carName :request.body.car_name, carModel:request.body.car_model, carNumber:request.body.car_number,carColor:request.body.car_color,
    carOwnerName: request.body.owner_name,likes : 0}).then(result => {
        response.json("data inserted successfully")
    }).catch(
        error => console.log(error)
    )
    // response.status(200).json({message: request.body})
})
app.delete('/deletepost',(request,response) => {
    console.log(request.body)
    db.collection('car_park').deleteOne({carName :request.body.carName}).then(result => {
        if(result){
            console.log(result)
            // console.log('record deleted')
            response.json("record deleted");
        }
    }).catch(error =>{
        response.json(error)
    })
})


app.put('/addUpdate', (request,response) => {
  const  body = request.body
    db.collection('car_park').updateOne({
        carName : body.carName, likes : body.likes},
        {
            $set : {likes : body.likes + 1}
    
        },
       { sort: {_id : -1},
        upsert : true
        }
        ).then(result => {
            response.json({result})
        }).catch(error => console.log(error))
})

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}, better go and catch it`);
})
