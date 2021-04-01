const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

let rappers ={
'21 savage': {
    'age': 28,
    'birthName': 'Sheyaa Bin Abraham-Joseph',
    'birthLocation': 'London, England'
},
'chance the rapper':{
    'age': 27,
    'birthName': 'Chancelor John Bennett',
    'birthLocation': 'Chicage, Illinois'
    },
    'dylan':{
        'age': 29,
        'birthName': 'Dylan',
        'birthLocation': 'dylan'
    }
}
 
app.get('/', (request, response) =>{
    response.sendFile(__dirname + '/index.html')
})
app.get('/api/rappers/:rapperName', (request, response)=> {
    const rapperName = request.params.rapperName.toLowerCase()
    console.log(rapperName)
    if (rappers[rapperName]){
     response.json(rappers[rapperName]) 
    }else{
        response.json(rappers['dylan'])
    }

     
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})