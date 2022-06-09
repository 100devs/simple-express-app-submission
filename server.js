const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;


let db,
    dbConnectionStr = 'mongodb+srv://drader2:KodaDash1@cluster0.ugc78.mongodb.net/?retryWrites=true&w=majority',
    dbName = 'workOrders',
    dbTable = 'request';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected To Database');
        db = client.db(dbName);
    })
    .catch(error => console.error(error));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/index.html')
    db.collection(dbTable).find().toArray()
    .then(results => {
        res.render('index.ejs', {})
        // console.log(results);
    })
    .catch(error => console.error(error));
    console.log('test')
});

app.post('/workOrders', (req, res) => {
    console.log('test');
    db.collection(dbTable).insertOne(req.body)
    .then(result => {
        console.log('Success');
        res.redirect('/');
    })
    .catch(error => console.error(error));
});

app.listen(PORT, (req, res) => {
    console.log(`Running server on port ${PORT}`);
});

