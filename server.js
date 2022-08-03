require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");


app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

let db, playersCollection;
let key = process.env.DATABASE_KEY;
MongoClient.connect(key, {useUnifiedTopology: true})
.then(client => {
    db = client.db("nba");
    playersCollection = db.collection("players");

    console.log("Connected To Database")

    
})
.catch(error => console.error(error))


app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("public"));

    
app.get("/", (req, res) => {
    res.render("index")
})

app.get("/players", (req, res)=>{
    playersCollection.find({}).toArray()
    .then(data => {
        console.log(data)
        res.render("players", {data: data});
    })
    .catch(error => {
        console.error(error);
    })
    
})

app.post("/players", (req, res) => {
    playersCollection.insertOne({name: req.body.playerName, image: req.body.playerImage});
    res.redirect("/players")
})

app.patch("/players", (req, res) => {
    playersCollection.findOneAndUpdate({name: req.body.name}, {$set: {name: "Manu Ginobili", image: "https://cdn.nba.com/headshots/nba/latest/1040x760/1938.png"}})
})

app.delete("/players", (req, res) => {
    playersCollection.deleteOne({name: req.body.name})
    .then(result => {
        console.log(`${req.body.name} Deleted`)
    })
    .catch(error => console.error(error));
})

app.listen(PORT, ()=>console.log(`Server Started On Port: ${PORT}`))

