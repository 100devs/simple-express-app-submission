require('../models/database')
const { AutoEncryptionLoggerLevel } = require('mongodb')
const Guest = require('../models/Guest')

// GET /
// Homepage

exports.homepage = async(req, res) => {
    try {
        const limitNumber = 10
        const guests = await Guest.find({}).limit(limitNumber)
        res.render('index', {title: 'Hotel Info- Home', guests} );
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}


//get-Submit guest
exports.submitGuest = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('submit-guest', {title: 'Hotel Info - Submit Guest', infoErrorsObj, infoSubmitObj})
}

//post guest
exports.submitGuestOnPost = async(req, res) =>{

    try{
        const newGuest = new Guest({
            name: req.body.name,
            phone_number: req.body.phone,
            email: req.body.email,
            date: req.body.date,
            room_number: req.body.room
        })
        await newGuest.save();

        req.flash('infoSubmit', 'Guest has been added.')
        res.redirect('/submit-guest') 
    }catch(error){
        req.flash('infoErrors', error)
        res.redirect('/submit-guest') 
    }
}

// Get Guest to Edit
exports.editGuest = async(req, res) => {
    try{

        let guestId = req.params.id
        limitNumber=1
        let guestById = await Guest.findById({_id: guestId}).limit(limitNumber)
        res.render('edit-guest', {title: "Hotel Info-Edit", guestById})
    }catch(error){
        res.status(500).send({message: error.message || "Error Occurred"})
    }
}


//Edit Guest on Post
exports.editGuestOnPost = async(req,res) => {
    try{
        let guestId = req.params.id
        let guestById = await Guest.findByIdAndUpdate({_id: guestId},{$set: {            
            name: req.body.name,
            phone_number: req.body.phone,
            email: req.body.email,
            date: req.body.date, 
            room_number: req.body.room}},{new:true})
            req.session.message = {
                type: 'success',
                message: 'User updated successfully.'
            }
            res.redirect("/")
            console.log(guestById)
    }catch(error){
        res.status(500).send({message: error.message || "Error Occurred"})
    }
}


//Post/search
exports.searchGuest = async(req, res) => {
    //searchTerm
    try{
        let searchTerm = req.body.searchTerm
        let limitNumber = 1
        let guest = await Guest.find({$text: {$search: searchTerm, $diacriticSensitive: true}}).limit(limitNumber)
        res.render('search', {title: 'Hotel Info- Search', guest} )
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }

}


//Delete Guest
exports.deleteGuest = async(req,res) =>{
    try{
        let guestId = req.params.id;
        let guestById = await Guest.findByIdAndRemove({_id: guestId})
        req.session.message = {
            type: 'success',
            message: 'User deleted.'
        }
        res.redirect('/')
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}

// [
//     {
//         "name": 'John Doe',
//         "phone_number": "123-456-7890",
//         "email": "john.doe@gmail.com",
//         "date": Date
//     },
//     {
//         "name": 'Mary Kay',
//         "phone_number": "456-232-8920",
//         "email": "mary.kay@gmail.com",
//         "date": Date
//     }
// ]




async function insertDymmyGuestData(){
    try{
        await Guest.insertMany([
            {
                "name": 'John Doe',
                "phone_number": "123-456-7890",
                "email": "john.doe@gmail.com",
                "date": "2022-01-07"
            },
            {
                "name": 'Mary Kay',
                "phone_number": "456-232-8920",
                "email": "mary.kay@gmail.com",
                "date": "2022-05-28"
            }
        ]);
    }catch(error){
        console.log('err' + error)
    }

}
//insertDymmyGuestData()