const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./model/users')
const PORT = process.env.PORT || 8080


//mongodb async connection
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
        console.log(`connected to mongo's ${conn.connection.name} database`)
    } catch (error) {
        console.log(`error: ${error.message}`)
    }
}


//setting my viewengine to use ejs
app.set('view engine', 'ejs')
//express will use public as static folder for css, js, etc...
app.use(express.static('public'))
//we can aprse arrays and objects now. old bodyparser
app.use(express.urlencoded({extended: true}))
//we are json ready baby!!!
app.use(express.json())


//create new user entry
app.post('/add', async(req, res)=>{
    const user = new User({
        eventName: req.body.eventName,
        date: req.body.date,
        name: req.body.name,
        companyPosition: req.body.companyPosition,
        spark: req.body.spark,
        email: req.body.email,
        followUp: req.body.followUp,
        //addLinkedIn: req.body.addLinkedIn,
        twitter: req.body.twitter
    })
    try {
        await user.save()
        res.redirect('/')
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//get all items from db and send them to index.ejs
app.get('/', async(req, res)=>{
    try {
        const user = await User.find()
        res.render('index',{items: user, title:"Networking Sheet"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete one
app.delete('/deleteOneEntry', async(req, res)=>{
    try {
        await User.deleteOne({name: req.body.name})
        res.status(200).json({message: "deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//handle boolean edit of linkedin link
app.put('/linkedIn', async(req, res) => {
    try {
        await User.updateOne({name: req.body.name, addLinkedIn: req.body.addLinkedIn},{
            $set: {
                addLinkedIn: !req.body.addLinkedIn
            }
        })
        res.status(200).json({message: "updated"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


//connecting to port or the process enviroment value of port and initiating our mongo function to connect
app.listen(PORT, ()=>{
    connectDB()
    console.log(`open on port ${PORT}`)
})