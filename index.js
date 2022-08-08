require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const Person = require('./models/phonebook');

app.use(express.static('dist'));
app.use(express.json());

morgan.token('post', (req, res) => JSON.stringify(req.body));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :post')
);

app.get('/api/persons', (request, response) => {
  Person.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.sendStatus(204).end();
    })
    .catch((error) => next(error));
});

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body;

  if (!name) {
    return response.status(400).json({
      error: 'Please provide a name',
    });
  }
  if (!number) {
    return response.status(400).json({
      error: 'Please provide a number',
    });
  }
  const person = new Person({
    name: name,
    number: number,
  });

  person.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.get('/info', (request, response) => {
  Person.find()
    .estimatedDocumentCount()
    .then((count) => {
      response.send(
        `<p>Phonebook has info for ${count} people</p><p>${new Date()}</p>`
      );
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}. Go catch it!`);
});

// Custom middleware that returns an error msg in JSON for unknown endpoints
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  next(error);
};

app.use(errorHandler);
