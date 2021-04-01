const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000

app.use(cors())

let games = {
    'crash bandicoot': {
        'name': 'Crash Bandicoot: Warped',
        'Release Date': 'Nov 04, 1998',
        'Genre': 'Action'
    },
    'dark souls': {
        'name': 'Dark Souls',
        'Release Date': 'Sep 22, 2011',
        'Genre': 'Role-Playing (RPG)'
    },
    'demon\'s souls': {
        'name': 'Demon\'s Souls',
        'Release Date': 'Oct 06, 2009',
        'Genre': 'Role-Playing (RPG)'
    },
    'the legend of zelda: breath of the wild': {
        'name': 'The Legend of Zelda: Breath of the Wild',
        'Release Date': 'Mar 03, 2017',
        'Genre': 'Action'
    },
    'animal crossing': {
        'name': 'Animal Crossing: New Horizons',
        'Release Date': 'Mar 20, 2020',
        'Genre': 'Simulation'
    },
    'unknown': {
        'Release Date': 'Unknown',
        'IGN Rating': 'Unknown'
    }
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/games/:game', (request, response) => {
    const gNames = request.params.game.toLowerCase()
    if(games[gNames]) {
        response.json(games[gNames])
    } else {
        response.json(games['Unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`)
})

