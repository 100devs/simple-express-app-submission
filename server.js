require('dotenv').config()

const { response } = require('express')
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2000
const cors = require('cors')


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'MedTracker'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/',(request, response)=>{
   
 
        response.sendFile(__dirname + '/index.html')
        console.log('html sent.')
   })

app.get('/medMinder',(request, response)=>{
    db.collection('meds').find().toArray()
    .then((data) => {
        response.render('index.ejs', { info: data });
    })
    .catch((error) => console.error(error));
});

app.get('/showMed/:medName', async (request,response) => { console.log("showMed Params:", request.params);
const params =request.params;
const medName = params.medName;
    const med = await db.collection('meds').findOne({ medName });


   response.send(med);
})

app.post('/addMed', (request, response) => {
    db.collection('meds').insertOne({medName: request.body.medName,
    doseAmt: request.body.doseAmt, doseFreq: request.body.doseFreq, doseDay: request.body.doseDay})
    .then(result => {
        console.log('Medication Added')
        response.redirect('/medMinder')
    })
    .catch(error => console.error(error))
})


app.put('/editMed', (request, response) => { console.log(request.body) // DONT FORGET TO CONSOLE LOG, SO YOU CAN SEE IF YOU'RE GETTING RESULTS!

    db.collection('meds').findOneAndUpdate({medName: request.body.medNameS, doseAmt: request.body.doseAmtS, doseFreq: request.body.doseFreqS, doseDay: request.body.doseDayS
        
    //confirm: request.body.confirmS
},{
        $set: {
            medName: request.body.newNameS, // Makese sense in my head; doesn't work. LMAO.
            doseAmt: request.body.nDoseAmtS,
            doseFreq: request.body.nDFreq,
            doseDay: request.body.nDDay
          }
    },{
        upsert: true
    })
    .then(result => {
        console.log('Med Updated!')
        response.redirect('/medMinder')

    })
    .catch(error => console.error(error))

})

app.delete('/deleteMed', (request, response) => {
    db.collection('meds').deleteOne({medName: request.body.medNameS})
    .then(result => {
        console.log('Medication Deleted')
        response.json('Medication Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})