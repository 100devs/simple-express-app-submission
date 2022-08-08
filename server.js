const express = require('express');
const bodyParser = require('body-parser'); 
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const PORT = 3000;
const app = express();
const connectionString = process.env.DB_STRING;
let db, pollsCollection;
app.set('view engine', 'ejs');

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to db');
        db = client.db('Polls');
        pollsCollection = db.collection('polls')
    })

app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', async (req, res) => {
    try{
        const polls = await pollsCollection.find().toArray()
        res.render('index.ejs', {polls: polls}) 
    } catch (error) {
        console.log(error)
    }
});

app.post('/polls', async (req, res) => {
    try {
        const question = req.body.question.trim();
        await pollsCollection.insertOne({
                                    question: question, 
                                    option1: req.body.option1, 
                                    option2: req.body.option2,
                                    option3: req.body.option3,
                                    votes1: 0,
                                    votes2: 0,
                                    votes3: 0,
                                    });
        res.redirect('/');
    }catch(error) {
        console.log(error);
    }
})

app.put('/votes', async (req, res) => {

    const vote = req.body.optionNumber;
    const updateObject = {}
    updateObject[vote] = req.body.votes

    try{
        await pollsCollection.updateOne({question: req.body.question},
            {
                $set: {
                    ...updateObject
                }
            },
            {
                upsert: false
            }
        )
        res.json('Success!')
    }catch(error) {
        console.log(error);
    }
    
    
})

app.delete('/deletePolls', async (req, res) => {
    try {
        await pollsCollection.deleteOne({question: req.body.poll})
        res.json('Poll deleted');
    } catch(error) {
        console.log(error);
    }   
})


app.listen(process.env.PORT || PORT, () => {
    console.log('listening on port 3000')
});



