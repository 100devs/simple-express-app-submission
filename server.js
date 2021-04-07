const express = require('express')
const app = express()//will give us all the functions that came from express are now in app so we can use it anywhere
const cors = require('cors')
const PORT = 5000

app.use(cors())//app = express and it now knows to use cors

let heroes ={
  'batman': {
    'name': 'Bruce Wayne',
    'power': 'smart & rich',
    'color': 'black'
  },
  'superman': {
    'name': 'Clark Kent',
    'power': 'flight and superhuman strength',
    'color': 'red & blue'
  },
  'wonder woman': {
    'name': 'Diana Prince',
    'power': 'superhuman strength & superspeed',
    'color': 'red & blue'
  },
  'unknown': {
    'name': 'unknown',
    'power': 'unknown',
    'color': 'unknown'
  }
}



app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')//node to pull file from (html)
}) //get takes in two values, the request to / for normal homepage load. Then it will run a callback function that has two param

app.get('/api/heroes/:heroesName', (request, response)=>{
  const heroName = request.params.heroesName.toLowerCase()
  console.log(heroName)
  if(heroes[heroName]){
    response.json(heroes[heroName])
  }else{
    response.json(heroes['unknown'])
  }
  response.json(heroes[heroName])
})

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})//another method that comes with express: a variety of http
