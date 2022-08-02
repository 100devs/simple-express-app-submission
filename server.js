const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const PORT = 8000;
require('dotenv').config()

app.set('view engine', 'ejs'); 
app.use(express.json()); 
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'exercise'

// Connect to database
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    })
    .catch(err => console.error(err));

// Randomly select an exercise from the three categories 
function randomEx(arr) {
    const index = Math.floor(Math.random() * arr.length);
    const item = arr[index];
    return item;
}

// Sort exercises from db into categories based on type of exercise 
function routine(arr) {
    const upper = arr.filter(exercise => exercise.type === 'Upper body');
    const core = arr.filter(exercise => exercise.type === 'Core');
    const lower = arr.filter(exercise => exercise.type ===  'Lower body');
    return [randomEx(upper), randomEx(core), randomEx(lower)]
}

app.get('/', (req, res) => {
    db.collection('library').find().toArray()
        .then(data => {
            const sample = routine(data);
            res.render('index.ejs', { info: sample });
        })
        .catch(err => console.error(err))
});

app.get('/api/library', (req, res) => {
    db.collection('library').find().toArray()
        .then(data => {
            res.json(data)
        })
        .catch(err => console.error(err))
});

app.get('/api/library/:title', (req, res) => {
    const id = req.params.title;
    db.collection('library').findOne({ title: id })
        .then(data => {
            if (data) {
                res.json(data);
            } else {
                res.status(404).end();
            }
        })    
        .catch(err => console.error(err))
});

app.delete('/api/library/:title', (req, res) => {
    const id = req.params.title;
    db.collection('library').deleteOne({ title: id })
        .then(result => {
            console.log('Exercise deleted');    
            res.json('Exercise deleted');
        })    
        .catch(err => console.error(err))
});

app.post('/api/library', (req, res) => {
    
    if (!req.body.title) {
        return res.status(400).json({
            error: 'content missing'
        });
    }

    db.collection('library').insertOne({
        title: req.body.title,
        instructions: req.body.instructions,
        type: req.body.type,
        link: req.body.type
    })
        .then(result => {
            console.log('Exercise added');
            res.json('Exercise added')
        })
        .catch(err => console.error(err))
});

// Make connection with host (local or cloud)
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});