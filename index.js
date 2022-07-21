const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const path = require('path');
require('dotenv').config()

const password = process.env.MONGO_PASS
const PORT = process.eventNames.PORT;

MongoClient.connect(`mongodb+srv://sashamars:${password}@cluster0.0tvvaxm.mongodb.net/?retryWrites=true&w=majority`, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('thePlantSpot')
        const userCollection = db.collection('users')
        const postsCollection = db.collection('posts');
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.urlencoded({ extended: true }));

        // Get Requsts for the Vairous .ejs files
        app.get('/profile.ejs', (req, res) => {
            userCollection.find().toArray()
            .then(results => {
                console.log(results);
                res.render('profile.ejs', { users: results});
            })
            .catch(error => console.log(error));
        });

        app.get('/popular_following_posts.ejs', (req, res) => {
            postsCollection.find().toArray()
            .then(results => {
                console.log(results);
                res.render('popular_following_posts.ejs', { plants: results});
            })
            .catch(error => console.log(error));
        });

        app.get('/signin_create_logout.ejs', (req, res) => {
            postsCollection.find().toArray()
            .then(results => {
                res.render('signin_create_logout.ejs');
            })
            .catch(error => console.log(error));
        });

        


        app.put('/plants', (req, res) => {
            postCollection.findOneAndUpdate (
                {name: 'Danny'},
                {
                    $set: {
                        name: req.body.name,
                        plant: req.body.plant
                    }
                },
                {
                    upsert: true
                }
            )
            .then(result => {
                res.json('Success');
            })
            .catch(error => console.log(error)); 
        });
        app.post('/users', (req, res) => {
            userCollection.insertOne(req.body)
            .then(result => {
                res.redirect('profile.ejs');
            })
            .catch(error => console.log(error));
        });
        app.delete('/plants', (req, res) => {
            postsCollection.deleteOne(
                {name: req.body.name},
            )
            .then(result => {
                if(result.deletedCount === 0){
                    return res.json('No plant to delete')
                }
                res.json(`Deleted Darth's plant`)
            })
            .catch(error => console.error(error));
        })
        
        // userCollection.deleteMany({});
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch(error => console.log(error));





