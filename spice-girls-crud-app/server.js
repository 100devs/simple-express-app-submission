const express = require('express')
const app = express()
const cors = require ('cors')
const PORT = 8000

app.use(cors())

const spiceGirls = {
    'scary spice': {
        'birthName': 'Melanie Brown',
        'age': 47,
        'birthLocation': 'Hyde Park, Leeds'
    },
    'sporty spice': {
        'birthName': ' Melanie Chisholm',
        'age': 48,
        'birthLocation':'Whiston, Lancashire'
    },
    'ginger spice': {
        'birthName': 'Geraldine Estelle Horner',
        'age': 49,
        'birthLocation':'Watford, Hertfordshire'
    },
    'posh spice': {
        'birthName': 'Victoria Caroline Beckham',
        'age': 48,
        'birthLocation':'Harlow, Essex, United Kingdom'
    },
    'baby spice': {
        'birthName': 'Emma Lee Bunton',
        'age': 46,
        'birthLocation':'Finchley, Barnet, London'
    },
    'unknown': {
        'birthName': 'unknown',
        'age': 0, 
        'birthLocation': 'unknown'
    }
}

   


//network request//
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html') // 
})

app.get('/api/:name', (request, response) => {
    const spiceGirlName = request.params.name.toLocaleLowerCase()
    if (spiceGirls[spiceGirlName]) {
        response.json(spiceGirls[spiceGirlName])
    } else {
        response.json(spiceGirls['unknown'])
    }
   
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})

