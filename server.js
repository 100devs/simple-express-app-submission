const express = require('express');
const app = express()
const cors = require('cors');
const PORT = 8000


app.use(cors())



const bands = {
    "blink-182":{
        'origin': 'Poway,Califorinia',
        'yearsActive': '1992-Present',
        'popular song': 'I Miss You',
    },
    "my chemical romance":{
        'origin': 'Newark, New jersey',
        'yearsActive': '2001-present',
        'popular song': 'Welcome To The Black Parade',
    }, 
    "fall out boy":{
        'origin': 'Wilmette, Illinois',
        'yearsActive': '2001-present',
        'popular song': 'Dance, Dance',
    }, 
    "paramore":{
        'origin': 'Franklin, Tennessee',
        'yearsActive': '2004-present',
        'popular song': 'Misery Business',
    }, 
    "panic at the disco":{
        'origin': 'Las Vegas, Nevada',
        'yearsActive': '2004-present',
        'popular song': 'I Write Sins Not Tragedies',
    }, 
    "evanescence":{
        'origin': 'Little Rock, Arkansas',
        'yearsActive': '1995-present',
        'popular song': 'Bring Me To Life',
    }, 
    "yellowcard":{
        'origin': 'Jacksonville, Florida',
        'yearsActive': '1997-present',
        'popular song': 'Ocean Avenue',
    }, 
    "pierce the veil":{
        'origin': 'San Diego, California',
        'yearsActive': '2006-present',
        'popular song': 'King For A Day',
    },
    "sleeping with sirens":{
        'origin': 'Orlando, Florida',
        'yearsActive': '2009-present',
        'popular song': 'If You Cant Hang',
    }, 
    'unknown':{
        'origin': 'unknown',
        'yearsActive': 'unknown',
        'popular song': 'unknown',
    }
}


app.get('/', (request, response ) => {
    response.sendFile(__dirname + '/index.html')
})


app.get('/api/:name', (request, response) => {
    const bandName = request.params.name.toLowerCase()
    if(bands[bandName]){
        response.json(bands[bandName])
    }else{
        response.json(bands['unknown']) 
    }
} )

app.listen(process.env.PORT || PORT, () => {
    console.log(`port ${PORT} is running!`)
})