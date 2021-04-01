const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

let golfer = {
  'tony finau':{
    'age': 31,
    'tournamentsWon': '2016 Puerto Rico Open'
  },
  'rickie fowler':{
    'age': 32,
    'tournamentsWon': '2012 Wells Fargo Championship, 2015 Player\'s Championship, 2015 Deutsche Bank Championship, 2017 Honda Classic, 2019 Waste Management Open'
  },
  'unknown':{
    'age': 1,
    'tournamentsWon': 'none'
  }

}

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/golfer/:tournamentsWon', (request, response) => {
  const golfWin = request.params.tournamentsWon.toLowerCase()
  if (golfer[golfWin]) {
    response.json(golfer[golfWin])
  } else {
    response.json(golfer['unknown'])
  }
  response.json(golfer[golfWin])
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
