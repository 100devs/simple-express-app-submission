const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient
const PORT = 8000
const mongoString = "mongodb+srv://emo:neon-pop-punk8@cluster0.ssf0umq.mongodb.net/?retryWrites=true&w=majority"

MongoClient.connect(mongoString, {useUnifiedTopology:true})
    .then(client => {
        console.log("Connected to Database")
        const db = client.db("best-songs-api")
        const bands = db.collection("bands")

        app.set("view engine", "ejs")

        app.use(cors())
        app.use("/static", express.static("./static/"))
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())

        app.listen(process.env.PORT || PORT, () =>{
            console.log(`The server is running on ${PORT}. You better go catch it!`)
        })

        app.get("/", (req,res) =>{
            // res.sendFile(__dirname + "/index.html")
            db.collection("bands").find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(err => console.error(err))
            res.render("index.ejs", {})
        })

        app.get("/bands", (req, res) =>{
            db.collection("bands").find().toArray()
                .then(results => {
                    res.render("bands.ejs", {bands:results})
                })
                .catch(err => console.error(err))
        })

        app.get("/dev", (req, res) =>{
            db.collection("bands").find().toArray()
                .then(results => {
                    res.render("dev.ejs", {bands:results})
                })
                .catch(err => console.error(err))
        })

        app.get("/api/:band", (req, res) =>{
            //pass from mongodb

            db.collection("bands").find().toArray()
                .then(results => {
                    const bandName = req.params.band.toLowerCase()
                    if(results[bandName]){
                        res.json(results[bandName])
                    }else{
                        res.json(results['unknown'])
                    }
                })
            /*const bandData = req.params.band.toLowerCase()
            if(bands[bandData]){
                res.json(bands[bandData])
            }else{
                res.json(bands['unknown'])
            }*/
        })

        app.post("/songs", (req,res) =>{
            bands.insertOne(req.body)
                .then(result => {
                    console.log(result)
                    res.redirect("/dev")
                })
                .catch(err => console.error(err))
        })

        app.post("/bandsuggest", (req,res) =>{
            //add functionality later
        })

        //TODO: update from old band
        app.put("/songs", (req,res) =>{
            bands.findOneAndUpdate(
                {band: req.body.band},
                {
                    $set: {
                        band: req.body.band,
                        song: req.body.song
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    console.log(result)
                    res.json("success")
                })
                .catch(err => console.error(err))
        })

        app.delete("/songs", (req, res) => {
            bands.deleteOne(
                {band: req.body.band}
            )
                .then(result => {
                    if(result.deletedCount === 0){
                        return res.json("No empty data to delete")
                    }
                    res.json("Deleted empty data")
                })
                .catch(err => console.error(err))
        })

    })
    .catch(err => console.error(err))

/*app.get('/api/:band', (req, res) =>{
    const bandData = req.params.band.toLowerCase()
    if(bands[bandData]){
        res.json(bands[bandData])
    }else{
        res.json(bands['unknown'])
    }
})*/

/*const bands = {
    "unknown": {
        "song": "no data",
        "youtube": "#"
    },
    "dance gavin dance": {
        "bandName": "Dance Gavin Dance",
        "song": "Alex English",
        "youtube": "#"
     },
     "paramore": {
        "bandName": "Paramore",
        "song": "Pressure",
        "youtube": "#"
     },
     "panic! at the disco": {
        "bandName": "Panic! At The Disco",
        "song": "Lying Is The Most Fun A Girl Can Have Without Taking Her Clothes Off",
        "youtube": "#"
     },
     "fall out boy": {
        "bandName": "Fall Out Boy",
        "song": "Grand Theft Autumn",
        "youtube": "#"
     },
     "my chemical romance": {
        "bandName": "My Chemical Romance",
        "song": "I'm Not Okay (I Promise)",
        "youtube": "#"
     },
     "hawthorne heights": {
        "bandName": "Hawthorne Heights",
        "song": "Ohio Is For Lovers",
        "youtube": "#"
     },
     "escape the fate": {
        "bandName": "Escape The Fate",
        "song": "This War Is Ours (The Guillotine II)",
        "youtube": "#"
     },
     "mayday parade": {
        "bandName": "Mayday Parade",
        "song": "Three Cheers For Five Years",
        "youtube": "#"
     },
     "jimmy eat world": {
        "bandName": "Jimmy Eat World",
        "song": "Hear You Me",
        "youtube": "#"
     },
     "bright eyes": {
        "bandName": "Bright Eyes",
        "song": "Lover I Don't Have To Love",
        "youtube": "#"
     },
}*/
