const express = require('express');
const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config({ path: './config/config.env' })

let db,
    dbConnectionStr = process.env.MONGO_URI
    dbName = process.env.DB_NAME

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (request, response) => {
    db.collection('lyrics').find().sort({"likes": -1}).toArray()
    .then(results => {
        response.render('index.ejs', { lyrics: results })
    })
    .catch(err => console.log(err));
})

app.post("/addLyrics", (request, response) => {
    db.collection("lyrics")
    .insertOne({title: request.body.title, lyrics: request.body.lyrics, likes: 0})
    .then(result => {
        console.log("lyric added");
        response.redirect('/');
    })
    .catch(err => console.log(err));
})

app.delete('/deletelyrics', (request, response) => {
    db.collection("lyrics")
    .deleteOne(
        { title: request.body.title }
    ).then(result => {
        if (result.deletedCount === 0) {
            return response.json('No lyrics to delete');
        }
        response.json("Deleted lyrics")
    }).catch(err => console.log(err));
})

app.put("/upvote", (request, response) => {
    db.collection("lyrics")
    .findOneAndUpdate(
        { title: request.body.title },
        { 
            $set: { 
                likes: Number(request.body.likes) + 1
            }
        },
        {
            upsert: true
        }
    )
    .then(result => {
        console.log('Liked') 
        response.json('Liked') 
    })
    .catch(error => console.error(error)) // if something goes wrong, responds with an error

})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
