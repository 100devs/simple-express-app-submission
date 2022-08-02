// declare variables
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8900;
const Blog = require('./models/blog');
require('dotenv').config();

// set middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

mongoose.connect(
    process.env.DB_connection, 
    {useNewUrlParser: true},
    ()=> {console.log(`Connected to DB`)}
);

// app.get('/', async (req,res) => {
//     try {
//         Blog.find({}, (err, entry) => {
//             res.render('index.ejs', {
//                 blogEntries: entry
//             })
//         })
//         console.log(blogEntries)
//     } catch (error) {
//         if(error) {
//             res.status(500).send({message: error.message})
//         }
//     }
// });

app.get('/', async (req, res) => {
    try {
        Blog.find({}, (err, entry) => {
            res.render('index.ejs', {
                entries: entry
            })
        })
        // console.log(entries)
    } catch (error) {
        if (error) {
            res.status(500).send({message: error.message})
        }
    }
});

app.post('/', async (req,res) => {
    const blogEntry = new Blog(
        {
            content: req.body.content,
        }
    );
    try {
        await blogEntry.save();
        console.log(blogEntry);
        res.redirect('/');
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    }
});

app.listen(PORT, () => console.log(`Server is connected on port ${PORT}`))