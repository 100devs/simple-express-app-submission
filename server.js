console.log("may the source be with you ")

const express = require('express');
const app = express();

app.listen(3000, function(){
    console.log('listening on 3000, no relation to andre')
})

// app.get(endpoint, callback) //when i typed in node server, it did not like endpoint. I'm actually not sure I understand that. I think this is just the framework for app.get. will comment out for reference. //this didn't work either so i'm just doing to delete it all but not before committing because i am a hoarder of my own thoughts

//i left off at the crudread section on the article leon sent us. i am going to bed because i deserve rest

app.get('/', (request, response) => { //added es6 syntax to be fancy
    //do something here
    response.send('Hello World')
})
