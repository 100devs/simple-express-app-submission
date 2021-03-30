const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 8000;
const ejs = require('ejs');
const cors = require('cors');
let db, dbName = 'tenants';
let dbConnectionStr = 'mongodb+srv://sid:chocolate@cluster0.nbixj.mongodb.net/tenants?retryWrites=true&w=majority';

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    });

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/add', (req, res) => {
    res.render('add.ejs');
});

app.get('/search', (req, res) => {
    res.render('search.ejs');
});

app.get('/searchTenant/:name', urlencodedParser, (req, res) => {
    db.collection('tenants').findOne({fullname: req.params.name})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    })
});


app.get('/display', (req, res) => {
    db.collection('tenants').find().toArray()
    .then(data => {
        res.render('display.ejs', {info: data});
    })
    .catch(err => {
        console.log(err);
    });
});

app.post('/tenantAdd', urlencodedParser, (req, res) => {
    db.collection('tenants').insertOne(req.body)
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
});

app.delete('/delete', (req, res) => {
    console.log(req.body.flat);
    db.collection('tenants').deleteOne({flatno: req.body.flat})
    .then(answer => {
        res.redirect('/display');
    })
    .catch(err => {
        console.log(err);
    })
});

app.listen(process.env.PORT || PORT, (err) => {
    if(err) console.log(err);
    else console.log('App running on port ' + PORT);
});
