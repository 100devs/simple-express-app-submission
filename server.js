const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

let rappers ={
 '21 savage': {
  'age': 28,
  'birthName': 'Sheyaa',
  'birthLocation': 'London'
  },
  'chance the rapper': {
    'age': 27,
    'birthName': 'Chancelor'
    'birthLocation': 'Chicago'
  },
  'unknown': {
  'age': 1,
  'birthName': 'unkown'
  'birthLocation': 'unknown'
  }
}

app.get('/', (request, response) => {
  response.sendFile(_dirname + '/index.html')
})

app.get('/api/rappers/:rapperName', (request, response) => {
  const rapName = request.param.rapperName.toLowerCase()
  console.log(rapName)
  if(rappers[rapName]){
  response.json(rappers[rapName])
}else{
  response.json(rappers['unknown'])
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
