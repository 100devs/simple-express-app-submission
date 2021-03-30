const express = require('express');
const app = express();
const nodemon = require('nodemon');
const cors = require('cors');
const PORT = 8000;

app.use(cors())

const books = {
  "norwegian wood": {
    'title': "Norwegian Wood",
    "release_en": 1989
  },
  "the wind-up bird chronicle": {
    'title': "The Wind-Up Bird Chronicle",
    "release_en": 1997
  },
    "1q84": {
    'title': "1Q84",
    "release_en": 2011
    },   
    "kafka on the shore": {
    'title': "Kafka on the Shore",
    "release_en": 2005
    }, 
    "a wild sheep chase": {
    'title': "A Wild Sheep Chase",
    "release_en": 1989
    },
  "unknown": {
    'title': "unknown",
    "release_en": "unknown",
  }
    }

app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html')
})

app.get('/api/books/:bookTitle', (request, response) =>{
    const bookTitle = request.params.bookTitle.toLowerCase()
    if(books[bookTitle]){
        response.json(books[bookTitle])
    }else{
        response.json(books['unknown']);
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})