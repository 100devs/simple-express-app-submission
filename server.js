const { response } = require('express')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const listing = require('./models/listing')
require('dotenv').config()


const user = {
    first: 'test',
    second: '2nd'
}


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    (err) => {console.log(err || 'Connected to db')}
)


// GET
app.get("/",(req, res) => {
    try{
        listing.find({}, (err, entries) => {
            res.render('index.ejs', {
                listings: entries
            })
        })
    } catch(err) {
        response.status(500).send({message: err.message})
    }
});

app.get("/create-listing",(req, res) => {
    res.render('create-listing.ejs')
});

//POST
app.post('/', async (req,res) => {
    const {model, color, mileage, description, price} = req.body
    const auctionListing = new listing(
        {
            model,
            color,
            mileage,
            price,
            description
        }
    )
    try {
        await auctionListing.save()
        console.log(auctionListing)
        res.redirect('/')
    } catch(err) {
        if(err) return res.status(500).send(err)
        res.redirect('/')
    }
})

//UPDATE
app
    .route('/edit/:id')
    .get((req, res) => {
        const id = req.params.id
        listing.find({}, (err, entries) => {
            res.render('edit.ejs', {
                listings: entries, idEntry: id
            })
        })
    })
    .post((req, res) => {
        const id = req.params.id
        const {model, color, mileage, price, description} = req.body
        listing.findByIdAndUpdate(
            id,
            {
                model,
                color,
                mileage,
                price,
                description
            },
            err => {
                if(err) return res.status(500).send(err)
                res.redirect('/')
            }
        )
    })

//DELETE
app
    .route('/remove/:id')
    .get((req, res) => {
        const id = req.params.id
        listing.findByIdAndDelete(id, err => {
            if(err) return res.status(500).send(err)
            res.redirect('/')
        })
    })



app.listen(process.env.PORT, () => console.log(`Server is runnning on ${process.env.PORT}`))