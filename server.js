const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://yuval:hbU9EtgyGsE9NVc@cluster0.lr4djyn.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// const majorScales = {
//     'amajor': {
//         scale: "amajor",
//         notes: ["A", "B", "C♯", "D", "E", "F♯", "G♯", "A"]
//     },
//     'aflatmajor': {
//         scale: "aflatmajor",
//         notes: ["A♭", "B♭", "C", "D♭", "E♭", "F", "G", "A♭"]
//     },
//     'bflatmajor': {
//         scale: "bflatmajor",
//         notes: ["B♭", "C", "D", "E♭", "F", "G", "A", "B♭"]
//     },
//     'bmajor': {
//         scale: "bmajor",
//         notes: ["B", "C♯", "D♯", "E", "F♯", "G♯", "A♯", "B"]
//     },
//     'cflatmajor': {
//         scale: "cflatmajor",
//         notes: ["C♭", "D♭", "E♭", "F♭", "G♭", "A♭", "B♭", "C♭"]
//     },
//     'cmajor': {
//         scale: "cmajor",
//         notes: ["C", "D", "E", "F", "G", "A", "B", "C"]
//     },
//     'csharpmajor': {
//         scale: "csharpmajor",
//         notes: ["C♯", "D♯", "E♯", "F♯", "G♯", "A♯", "B♯", "C♯"]
//     },
//     'dflatmajor': {
//         scale: "dflatmajor",
//         notes: ["D♭", "E♭", "F", "G♭", "A♭", "B♭", "C", "D♭"]
//     },
//     'dmajor': {
//         scale: "dmajor",
//         notes: ["D" , "E", "F♯", "G", "A", "B", "C♯", "D"]
//     },
//     'emajor': {
//         scale: "emajor",
//         notes: ["E", "F♯", "G♯", "A", "B", "C♯", "D♯", "E"]
//     },
//     'eflatmajor': {
//         scale: "eflatmajor",
//         notes: ["B♭", "C", "D", "E♭", "F", "G", "A", "B♭"]
//     },
//     'gmajor': {
//         scale: "gmajor",
//         notes: ["G", "A", "B", "C", "D", "E", "F♯", "G"]
//     },
//     'fmajor': {
//         scale: "fmajor",
//         notes: ["F", "G", "A", "B♭", "C", "D", "E", "F"]
//     },
//     'fsharpmajor': {
//         scale: "fsharpmajor",
//         notes: ["F♯", "G♯", "A♯", "B", "C♯", "D♯", "E♯", "F♯"]
//     },
//     'gflatmajor': {
//         scale: "gflatmajor",
//         notes: ["G♭", "A♭", "B♭", "C♭", "D♭", "E♭", "F", "G♭"]
//     },
// }

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to database')
        const db = client.db('Major-Music-Scales-API')
        const infoCollection = db.collection('Major-Scales')
    

    app.get('/', (request, response) => { 
        response.send(__dirname + '/index.html')
    })


    app.get('/api/:scale', (request, response) => {
        const scaleName = request.params.scale.toLowerCase()
        infoCollection.find({scale: scaleName}).toArray()

        .then(results => {
            console.log(results)
            response.json(results[0])
        })
        .catch(error => console.error(error))
    })
})

.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running!')
})