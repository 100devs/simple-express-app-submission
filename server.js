const express = require('express')  //Express helps modules that we want and makes our API nice and easy
const app = express()  //gives us all functions that came from express now in app, we can use app anywhere we want and have access to all the methods that come with express
const cors = require('cors')
const PORT =8000   //creating ports as variables

app.use(cors())

let avengers = {
'captain america':{
    'name': 'Steve Rogers', 
    'Team Affiliations': 'Avengers',
    'Abilities': 'Enhanced strength, speed, stamina, durability, agility, reflexes, senses, and mental processing via the super soldier serum'
},
'iron man':{
    'name': 'Anthony Edward "Tony" Stark', 
    'Team Affiliations': 'Avengers',
    'Abilities': 'Powered armor suit: Superhuman strength, speed, durability, agility, reflexes, and senses'
},
'scarlet witch':{
    'name': 'Wanda Marya Maximoff', 
    'Team Affiliations': 'Avengers',
    'Abilities': 'Superhuman genes allow energy manipulation and powerful access to magical energies, such as chaos magic'
},
'thor':{
    'name': 'Thor Odinson', 
    'Team Affiliations': 'Avengers',
    'Abilities': 'Superhuman strength, speed, durability and longevity, Electric Manipulation '  
    },
'black widow':{
    'name': 'Natasha Romanoff', 
    'Team Affiliations': 'Avengers',
    'Abilities': 'Expert spy, tactician, and hand-to-hand combatant'
},
'spider man':{
    'name': 'Peter Parker', 
    'Team Affiliations': 'Avengers',
    'Abilities':'Superhuman strength, speed, reflexes, agility, coordination and balance,Utilizing wrist-mounted web-shooters'
},
'dylan':{
    'name': 'Dylan', 
    'Team Affiliations': 'Dylan',
    'Abilities':'Dylan' 
}
}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html') //respond by sending you a file //dirname:where ever that file is look there
})    //requesting and we want to respond with an html inside the callback function// forward slash: normal home page loads //server listens to this, get is one of the four things that the server listens too. get, put, delete, and read

app.get('/api/avengers/:avengerName', (request, response) => {
    const heroName = request.params.avengerName.toLowerCase()
    console.log(heroName)
    if(avengers[heroName]){
        response.json(avengers[heroName])
    }else{
       response.json(avengers['dylan'])
   }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
}) //this method takes in two things a PORT and a CALLBACK

