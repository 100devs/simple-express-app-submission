const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Note = require('./models/noteSchema')

require('dotenv').config()
const PORT = 3200

mongoose.connect(process.env.DB_STRING, 
    { useNewUrlParser: true }, 
    () => {console.log("Connected to db!");}
)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', async (request, response) => {
    try {
        Note.find({}, (err,notes) =>{
            response.render('index.ejs', {notes: notes})
            console.log("we're here")
        })
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

//POST (CREATE)

app.post('/addNote', async(req,res) => {
    const note = new Note({
        title: req.body.title,
        note: req.body.note
    })
    try {
        await note.save();
        console.log(note)
        res.redirect("/");
    } catch (err) {
        if (err) return res.status(500).send(err);
        res.redirect("/");
    }
})

//EDIT (UPDATE)
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        Note.find({}, (err, notes) => {
            res.render("edit.ejs", { notes: notes, idNote: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        Note.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                note: req.body.note
            },

            err => {
                if (err) return res.status(500).send(err);
                res.redirect("/");
            });
    });

//DELETE
app.route('/remove/:id')
.get((req,res)=> {
    const id = req.params.id;
    Note.findByIdAndRemove(id, err=>{
        if (err) return res.send(500, err);
        res.redirect("/");
    })
})

//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}`)
})