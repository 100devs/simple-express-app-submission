const mongoose = require('mongoose');

const password = process.argv[2];

const url = `mongodb+srv://admin:${password}@cluster0.zlmmt.mongodb.net/?retryWrites=true&w=majority`;

const connection = mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = new mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  // get all the notes
  // mongoose.connect(url);
  Person.find({}).then((result) => {
    console.log('phonebook:');
    result.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
} else {
  // post a new note to the database
  // mongoose
  //   .connect(url)
  connection
    .then((result) => {
      const person = new Person({
        name: process.argv[3],
        number: '444-444-4444',
      });

      return person.save();
    })
    .then((result) => {
      return mongoose.connection.close();
    })
    .catch((error) => console.log(err));
}
