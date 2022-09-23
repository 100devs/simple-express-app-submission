const express = require('express')
const app = express()
const PORT = 8000

const rappers = {
    '21 savage': {    
        'age': 29,
        'birthName': 'Sheyaa Bin Abraham-Joseph',
        'birthLocation': 'London, England'
    },
    'chance the rapper':{
        'age':29,
        'birthName':"Chancelor Bennett",
        'birthLocation' : 'Chicago, Illinois'
    },
    'unknown':{
        'age':'unknown',
        'birthName':"unknown",
        'birthLocation' : 'unknown'
    }
}

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/:name', (request, response)=>{
    const rapperName = request.params.name.toLowerCase()
    if(rappers[rapperName]){
        response.json(rappers[rapperName])
    }else{
        response.json(rappers['unknown'])
    }
    
})

app.listen(PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Better go catch it!`)
})