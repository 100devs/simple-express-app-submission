const express = require("express")
const app = express()
const PORT = 8000

const pokemon = {
    "squirtle": {
        "type": "water",
        "category": "tiny turtle",
        "abilities": "torrent"
    },
    "bulbasaur":{
        "type": ["grass", "poison"],
        "category": "seed",
        "abilities": "overgrow"
    },
    "charmander":{
        "type": "fire",
        "category": "lizard",
        "abilities": "blaze"
    },
    "unknown":{
        "type": "unknown",
        "category": "unknown",
        "abilities": "unknown"
    }
}

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/api/:name", (req, res) =>{
    const pokemonName = req.params.name.toLowerCase()
    if (pokemon[pokemonName]){
       res.json(pokemon[pokemonName])
    } else {
        res.json(pokemon["unknown"])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}`)
})