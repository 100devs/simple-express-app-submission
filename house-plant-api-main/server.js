const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000


app.use(cors())

let housePlants = {

    'snake plant':{
        
        'waterCycle':'30 days',
        'fenestration': false,
        'leafPattern': 'striped',
        'climbs':false,
        'temperment': 'chill',
        'bestEnvironment': 'anywhere',
        

    },

    'dieffenbachia': {
        'waterCycle':'14 days',
        'fenestration': false,
        'leafPattern':'gradient',
        'climbs':false,
        'temperment': 'moderate',
        'bestEnvironment': 'bathroom',


    },

    'spider plant': {
        'waterCycle': '7 days',
        'fenestration': false,
        'leafPattern':'linear',
        'climbs':false,
        'temperment': 'moderate',
        'bestEnvironment': 'sunroom',


    },

    'fiddle leaf fig':{
        'waterCycle':'7 days',
        'fenestration': false,
        'leafPattern': 'solid',
        'climbs':false,
        'temperment': 'tempermental',
        'bestEnvironment': 'living room',

    },

    'monstera':{
        'waterCycle':'7 days',
        'fenestration': true,
        'leafPattern': 'solid',
        'climbs': true,
        'temperment': 'chill',
        'bestEnvironment': 'sunroom',

    },

    'pothos':{
        'waterCycle':'7 days',
        'fenestration': false,
        'leafPattern':'gradient',
        'climbs':true,
        'temperment': 'chill',
        'bestEnvironment': 'office',

    },

    'unknown':{
        'waterCycle':'unknown',
        'fenestration': false,
        'leafPattern': 'unknown',
        'climbs':false,
        'temperment': 'unknown',
        'bestEnvironment': 'unknown',

    }


}

app.get('/', (request,response) => {
    response.sendFile(__dirname +'/index.html')

})

app.get('/api/:name', (request,response)=>{

const plantName = request.params.name.toLowerCase()   
    if(housePlants[plantName]){
        response.json(housePlants[plantName])
    }else{
        response.json(housePlants['unknown'])
    }

})



app.listen( process.env.PORT || PORT, ()=>{
    console.log(`server is running on ${PORT}`)

})