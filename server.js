let book = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
//Express
const express = require('express');
const app = express();
app.set('view engine', 'ejs'); //Express will look in /views/ for an ejs file to render
app.use(express.static('public')); //middleware for public/front end files
app.use(express.json());


//Cors
const cors = require('cors');
app.use(cors());

//Morgan logger
const morgan = require('morgan');
app.use(morgan(' :method :url :response-time ms -  req.body -> :body')); //Custom token
morgan.token('body', (req) => {                                         //defines custom output param as :body above
  return JSON.stringify(req.body);
});

//PORT
const PORT = 3001;
app.listen(process.env.PORT || PORT,() => console.log(`Listening on port ${PORT}`));

//root GET response
app.get('/', (request, response) => {
  //response.send("<h1>API available at /api/persons/ </h1>")
  response.render('index.ejs')
});

//GET response for the whole phonebook
app.get('/api/persons', (request, response) => {
    response.json(book);
    
});

//GET response for information - in this case number of people in the book.
app.get("/api/info", (req, response) =>{
    const numPeople = book.length; //num people in the book
    const timeIsNow = new Date(); //current time
    response.send(`${numPeople} phonebook entries at ${timeIsNow}`);
} );

//GET for a specific phonebook entry
app.get("/api/persons/:id",(request, response )=> {
    const idNumber = Number(request.params.id); // gets 'id' and converts to number
    const resource = book.find(el => el.id === idNumber);
    if (resource) response.json(resource);      //if that id number exists, return the entry
    else response.status(404).end();            //if not, throw 404 and end without sending data
});

//DELETE a specific entry
app.delete("/api/persons/:id",(request, response) => {
    const idNumber = Number(request.params.id);
    const bookWithOneDeleted = book.filter(el => el.id !== idNumber);
    console.log(`Deleting id# ${idNumber}`)
    response.status(204).end();
});

app.post('/api/persons/', (request, response) => {
    const entry = request.body;

    if (!(entry.name && entry.number)){
        return response.status(400).json({"Error": "Content missing"})
    }
   if (book.find(el => el.name === entry.name)){
    return response.status(400).json({"Error": "Duplicate name"})
   }

    const newEntry = {
        id: Math.floor(Math.random() * 100000),
        name: entry.name,
        number: entry.number
    }

    console.log(newEntry);
    book = book.concat(newEntry);
    console.log(book)
    response.json(book)


});

console.log();