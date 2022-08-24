const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = process.env.PORT

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'doctor-patient-crud'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',async (request, response)=>{
    const patientsLits = await db.collection('patients').find({completed: false}).toArray()
    const doctorsLits = await db.collection('doctors').find({completed: false}).toArray()
    const dermatologyCompleted = await db.collection('patients').countDocuments({completed: true, specialty:"Dermatology"})
    const dermatologyTotal = await db.collection('patients').countDocuments({specialty:"Dermatology"})
    const neurologyCompleted = await db.collection('patients').countDocuments({completed: true, specialty:"Neurology"})
    const neurologyTotal = await db.collection('patients').countDocuments({specialty:"Neurology"})
    const ophthalmologyCompleted = await db.collection('patients').countDocuments({completed: true, specialty:"Ophthalmology"})
    const ophthalmologyTotal = await db.collection('patients').countDocuments({specialty:"Ophthalmology"})
    const pediatricsCompleted = await db.collection('patients').countDocuments({completed: true, specialty:"Pediatrics"})
    const pediatricsTotal = await db.collection('patients').countDocuments({specialty:"Pediatrics"})
    //patientsLits={specialty:"Neurology",completed:false,priority:false}
    //doctorsLits={specialty:"Neurology",completed:false,priority:false}
    response.render('index.ejs', 
    { patients: patientsLits, 
        doctors: doctorsLits, 
        ratioDermatology:dermatologyCompleted*100/dermatologyTotal, 
        ratioNeurology:neurologyCompleted*100/neurologyTotal, 
        ratioOphthalmology:ophthalmologyCompleted*100/ophthalmologyTotal,
        ratioPediatrics:pediatricsCompleted*100/pediatricsTotal,  
    })

/*   
     db.collection('todos').find().toArray()
     // Here data is the array result of the promise above
     .then(data => {
        // asking only for documents with completed property equal to false
         db.collection('todos').countDocuments({completed: false})
         .then(itemsLeft => {
            //passing resulting data from the promise into ejs, data is going to be named items
            // rendering ejs with the data passed
             response.render('index.ejs', { items: data, left: itemsLeft })
         })
     })
     // console log the error if it happens
     .catch(error => console.error(error)) */
})

app.post('/addPatient', (request, response) => {
    db.collection('patients').insertOne({specialty: request.body.specialty, completed: false, priority: false})
    .then(result => {
        console.log('Patient Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.post('/addDoctor', (request, response) => {
    db.collection('doctors').insertOne({specialty: request.body.specialty, completed: false, priority: false})
    .then(result => {
        console.log('Doctor Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})


app.put('/matchPatientDoctor', (request, response) => {
    console.log(request.body.itemFromJS)
    db.collection('doctors').updateOne({specialty: request.body.itemFromJS, completed: false},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Doctor updated')
    })
    .catch(error => console.error(error))
    
    db.collection('patients').updateOne({specialty: request.body.itemFromJS, completed: false},{
        $set: {
            completed: true
          }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Patient Updated')
        response.json('Matched Completed')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
    db.collection(request.body.dbFromJS).deleteOne({specialty: request.body.itemFromJS})
    .then(result => {
        console.log('Request Deleted')
        response.json('Request Deleted')
    })
    .catch(error => console.error(error))
}) 

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})