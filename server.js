const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const cars = {
    'Corvette':{
        'Year' : '1955',
        'manufacturer': 'Chevrolet',
        'displacement': '455',
    },
    'mustang':{
        'Year' : '1961',
        'manufacturer': 'Ford',
        'displacement': '355',
    },
    'charger':{
        'Year' : '1966',
        'manufacturer': 'Dodge',
        'displacement': '455',
    }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:muscleCarName', (request,response)=>{
    const muscleCarName = request.params.muscleCarName.toLowerCase()
    if(cars[muscleCarName]){
        response.json(cars[muscleCarName])
    }else{
        response.json(cars['humans'])
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}! You better go catch it!`)
})