const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8000;

app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:playername', (req, res) => {
    console.log(req.params.playername)
    const player = req.params.playername.toLowerCase();
    if (players[player]) {
        res.json(players[player])
    } else {
        res.json(players['unknown'])
    }
})


app.listen(process.env.PORT || 8000, () => {
    console.log(`We are up and running on port ${PORT}`)
})


let players = {
    'kevin trapp' : {
        'position': 'Goalkeeper' ,
        'age': '30'
    }, 
    'martin hinteregger' : {
        'position': 'Defense' ,
        'age': '29'
    }, 
    'evan ndicka' : {
        'position': 'Defense' ,
        'age': '121'
    }, 
    'sebastian rode' : {
        'position': 'Midfield' ,
        'age': '31'
    }, 
    'unknown' : {
        'position': 'unknown' ,
        'age': 'unknown'
    }
}