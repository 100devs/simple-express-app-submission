const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const PORT = 8000

app.use(cors())

let islands = {
    'kauai':{
        'nickname': 'The Garden Isle',
        'capital': "Lihue",
        'popular destination': 'Princeville',
        'weather': 'always sunny',
        'activities': ['surfing', 'hiking', 'shopping'],
        'local thing': 'farmers market'
    },
    'maui':{
        'nickname': 'The Valley Isle',
        'capital': 'Wailuku',
        'popular destination': 'Lahaina',
        'weather': 'always sunny',
        'activities': ['surfing', 'whale watching', 'shopping'],
        'local thing': 'fishing'
    },
    'hawaii':{
        'nickname': 'The Big Island',
        'capital': "Hilo",
        'popular destination': 'Kona',
        'weather': 'rains on the eastside, sunny on the westside',
        'activities': ['fishing', 'hiking', 'volcanoes'],
        'local thing': 'farmers market'
    },
    'oahu':{
        'nickname': 'The Gathering Place',
        'capital': "Honolulu",
        'popular destination': 'Waikiki',
        'weather': 'always sunny',
        'activities': ['surfing', 'hiking', 'shopping'],
        'local thing': 'nightlife'
    },
    'unknown':{
        'nickname': 'unknown',
        'capital': "unknown",
        'popular destination': 'unknown',
        'weather': 'unknown',
        'activities': 'unknown',
        'local thing': 'unknown'
    }
}


app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on ${PORT}`)
})

app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request,response)=>{
    const islandsName = request.params.name.toLowerCase()
    if(islands[islandsName]){
        response.json(islands[islandsName])
    }else{
        response.json(islands['unknown'])
    }
})