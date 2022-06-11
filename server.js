const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
// const { modInfo, workOrder } = require('./model.js');
const PORT = 8000;


let workOrderDb,
    modMachInfoDB,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(dbConnectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(client => {
        console.log('Connected To Database');
        workOrderDb = client.db('workOrders');
        modMachInfoDB = client.db('modMachInfo');
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    workOrderDb.collection('request').find().toArray()
        .then(results => {
            modMachInfoDB.collection('mods').find().toArray()
                .then(data => {
                    res.render('index.ejs', { request: results, mods: data })
                })
        })
        .catch(error => console.error(error));
});

app.post('/workOrders', (req, res) => {
    workOrderDb.collection('request').insertOne(req.body)
        .then(result => {
            res.redirect('/');
        })
        .catch(error => console.error(error));
});

app.listen(PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});

