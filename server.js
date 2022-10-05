require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

let db, dbName = 'expense-exhibit';

MongoClient.connect(MONGODB_URI)
  .then(client => {
    console.log('Connected to database');
    db = client.db(dbName);
  })
  .catch(error => {
    console.error(`Internal server error: ${error}`)
  });

app.set('view engine', 'ejs');
app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
app.use( express.static('public') );

app.get('/dashboard', (req, res) => {
  res.render('dashboard.ejs')
})

// User routes
app.get('/user/:uid', async (req, res) => {
  try {
    let user = await db.collection('user').findOne({ uid: req.params.uid });

    // sort expenses by newest first
    user = {
      ...user,
      expenses: user.expenses.reverse()
    }
    
    res.status(302).json(user);
  } catch(err) {
    console.error(`Error: ${err}`)
  }
});

app.post('/user', async (req, res) => {
  const { username } = req.body;

  if (username.length < 4) {
    return res.status(400).json({
      error: 'Invalid username'
    })
  }

  const newUser = {
    uid: uuidv4(),
    username,
    expenses: [],
  }

  try {
    const result = await db.collection('user').insertOne(newUser);
    const user = await db.collection('user').findOne({ _id: result.insertedId });
  
    res.status(201).json({ 
      uid: user.uid,
      username: user.username
    })
  } catch(err) {
    console.error(`Error: ${err}`)
  }
})

// Expense Routes
// Get all user's expenses
app.get('/', async (req, res) => {
  try {
    const allUser = await db.collection('user').find().toArray();
    // Remove sensitive information && sort expenses by newest first
    const newAllUser = allUser.map(user => ({ username: user.username, expenses: user.expenses.reverse() }))
    
    res.render('index.ejs', { allUser: newAllUser })
  } catch(err) {
    console.error(`Error: ${err}`)
  }
})

// Get a single expense
app.get('/dashboard/expenses/:id/:uid', async (req, res) => {
  try {
    const user = await db.collection('user').findOne({ uid: req.params.uid });
    const expense = user.expenses.find(a => a.id == req.params.id)

    res.render('editExpense.ejs', { expense })
  } catch(err) {
    console.error(`Error: ${err}`)
    res.redirect('/dashboard')
  }
})

app.post('/expenses/:uid', async (req, res) => {
  const newExpense = {
    id: ObjectId(),
    title: req.body.title,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount
  }

  try {
    const result = await db.collection('user').updateOne(
      { uid: req.params.uid },
      { $push: { expenses: newExpense }}
    );

    res.render('dashboard.ejs');
  } catch(err) {
    console.error(`Error: ${err}`)
  }
})

app.put('/user/:uid/expenses/:id', async (req, res) => {
  const expenseIdToUpdate = ObjectId(req.params.id)
  const { title, date, category, amount} = req.body;

  try {
    const result = await db.collection('user').updateOne(
      { uid: req.params.uid, expenses: { $elemMatch: { id: expenseIdToUpdate }} },
      { $set: { "expenses.$.title": title, "expenses.$.date": date, "expenses.$.category": category, "expenses.$.amount": amount }}
    )

    res.status(201).redirect('/dashboard')
  } catch(err) {
    console.error(`Error: ${err}`)
  }
}) 

app.delete('/user/:uid/expenses/:id', async (req, res) => {
  try {
    const expenseIdToDelete = ObjectId(req.params.id);
    const result = await db.collection('user').updateOne(
      { uid: req.params.uid },
      { $pull: { expenses: { id: expenseIdToDelete }}}
    );
    res.status(302).render('dashboard.ejs')
  } catch(err) {
    console.error(`Error: ${err}`)
  }
}) 

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})