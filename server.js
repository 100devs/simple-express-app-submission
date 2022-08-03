const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const teas = {
    'black' : {
        'leavesAmount': '1 level tsp. per 6oz.',
        'waterTemp': 'full boil (212°)',
        'steepTime': '3-5 minutes'
    },
    'green' : {
        'leavesAmount': '1 level tsp. per 6oz.',
        'waterTemp': 'steaming briskly (175-180°)',
        'steepTime': '1-2 minutes'
    },
    'white' : {
        'leavesAmount': '2 level tsp. per 6oz.',
        'waterTemp': 'steaming briskly (175-180°)',
        'steepTime': '2-3 minutes'
    },
    'Oolong' : {
        'leavesAmount': '1 level tsp. per 6oz.',
        'waterTemp': 'almost boiling (195°)',
        'steepTime': '2-3 minutes'
    },
    'Pu-erh' : {
        'leavesAmount': '1 heaping tsp. per 6oz.',
        'waterTemp': 'full boil (212°)',
        'steepTime': '5 minutes'
    },
    'Purple' : {
        'leavesAmount': '1 heaping tsp. per 6oz.',
        'waterTemp': 'steaming briskly (175-180°)',
        'steepTime': '3 minutes'
    },
    'Mate' : {
        'leavesAmount': '1 level tsp. per 6oz.',
        'waterTemp': 'steaming (150-160°)',
        'steepTime': '2-3 minutes'
    },
    'Herbal' : {
        'leavesAmount': '1 heaping tsp. per 6oz.',
        'waterTemp': 'full boil (212°)',
        'steepTime': '5-10 minutes'
    },
    'Rooibos' : {
        'leavesAmount': '1 level tsp. per 6oz.',
        'waterTemp': 'full boil (212°)',
        'steepTime': '5-10 minutes'
    },
    'unknown' : {
        'leavesAmount': 'unknown',
        'waterTemp': 'unknown',
        'steepTime': 'unknown'
    },
    
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response)=>{
    const teaType = request.params.name.toLowerCase()
    if (teas[teaType]) {
        response.json(teas[teaType])
    } else {
        response.json(teas['unknown'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Listening on port ${PORT}...`)
}) 