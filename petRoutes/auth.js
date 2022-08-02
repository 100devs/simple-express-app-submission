// const Pet = require('../model/petInfoModel');
// const petInfo = require('../model/petInfoModel');

const User = require('../model/User')

//adds a new pet to the db, subdocument of the username field
exports.addPet = async (req, res, next) => {
    const petName = req.body.name;
    const petAge = req.body.age;
    const petSpecies = req.body.species;
    const currentUsername = req.user;
    //finds the current user in the db
    User.findOne({
            "username": currentUsername
        })
        .then(doc => {
            //checks to see if the pet is already in the db
            let original = true;
            for (let i = 0; i < doc.pets.length; i++) {
                if (doc.pets[i].petName === petName) {
                    original = false;
                    res.status(401).json({
                        message: "Pet already exists in database"
                    })

                }
            }
            //if the pet does not already exist, it will add it
            if (original) {
                doc.pets.push({
                    petName,
                    petAge,
                    petSpecies
                });
                doc.save();
                res.status(201).json({
                    message: "pet created"
                });

            }

        })
        .catch((err) => {
            res.status(401).json({
                message: "Pet creation not successful",
                error: err.message
            })
        })
}

exports.getPets = async (req, res, next) => {
    const currentUsername = req.user;

    User.findOne({
            "username": currentUsername
        })
        .then(doc => {
            const pets = doc.pets.map(pet => pet['petName'])
            res.status(200).json({
                petNames: pets
            })
        })
        .catch((err) => {
            res.status(401).json({
                message: "no pets in DB",
                error: err.message
            })

        })
}

//puts data from client side metrics form(petinfosubmit) into db
exports.petMetrics = async (req, res, next) => {
    const {
        name,
        date,
        weight,
        appetite,
        mood,
        water,
        urine,
        stool,
        stoolConsistency,
        vomit
    } = req.body;
    const currentUsername = req.user;
    let petData = {
        date,
        weight,
        appetite,
        mood,
        water,
        urine,
        stool,
        stoolConsistency,
        vomit
    }
    //finds the current user in the DB
    User.findOne({
            "username": currentUsername
        })
        .then(doc => {
            //filters to find the pet by name from the button that was clicked client side
            const pet = doc.pets.filter(pet => pet.petName === name)[0]
            let original = true;
            //loops through data, if a date is already there, it will replace the data
            for (let i = 0; i < pet.healthMetrics.length; i++) {
                if (pet.healthMetrics[i].date == date) {
                    pet.healthMetrics[i] = petData
                    original = false;
                }
            }
            //if it's a new entry, it will add it to the collection
            if (original) {
                pet.healthMetrics.push(petData)
            }
            doc.save();
            res.redirect('/petinfosubmit')

        })
        .catch((err) => {
            res.status(401).json({
                message: "Pet data entry not successful",
                error: err.message
            })
        })
}

exports.getLoggedMetrics = async (req, res, next) => {
    const name = req.params.name;
    const currentUsername = req.user;
    //finds the current user in the DB
    User.findOne({
            "username": currentUsername
        })
        .then(doc => {
            const pet = doc.pets.filter(pet => pet.petName === name)[0]
            const healthMetrics = pet.healthMetrics.sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                } else if (a.date > b.date) {
                    return 1;
                } else {
                    return 0;
                }
                }) 


//returns both the full data with pet info, and health metrics sorted by date
            res.json({pet: pet, healthMetrics: healthMetrics})

        })
        .catch((err) => {
            res.status(401).json({
                message: "date collecting not successful",
                error: err.message
            })
        })

}

exports.deleteMetric = async (req, res, next) => {
    const currentUsername = req.user;
    const {
        date,
        name
    } = req.body;
    User.findOne({
            "username": currentUsername
        })
        .then(doc => {
            //filters to find the pet by name from the button that was clicked client side
            const pet = doc.pets.filter(pet => pet.petName === name)[0]
            //loops through data and splices out the matching date data metric
            for (let i = 0; i < pet.healthMetrics.length; i++) {
                if (pet.healthMetrics[i].date == date) {
                    pet.healthMetrics.splice(i, 1)
                }
            }
            doc.save()
            res.redirect('/petinfosubmit')
        })
        .catch((err) => {
            res.status(401).json({
                message: "date deletion not successful",
                error: err.message
            })
        })

}
