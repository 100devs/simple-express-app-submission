const express = require('express');
const app = express();
const bodyParser = require('body-parser')
//const jsonParser = bodyParser.json()


//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/', (request, response) => { //added es6 syntax to be fancy
    //do something here
    response.sendFile(__dirname + '/index.html')
}) //this worked

app.post('/todo', (request, response)=>{
    console.log('just work please') //post not working right now
    console.log(request.body)
})

app.listen(3000, function(){
    console.log('listening on 3000, no relation to andre')
})

