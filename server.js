const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log('listening on 3000, no relation to andre')
})


app.get('/', (request, response) => { //added es6 syntax to be fancy
    //do something here
    response.sendFile(__dirname + '/index.html')
}) //this worked

