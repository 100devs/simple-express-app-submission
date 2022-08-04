const express = require('express')
const router = express.Router()
const Plant = require('../models/plant')
const User = require('../models/user')
const UserPlant = require('../models/userPlant')
const Note = require('../models/note')
const cloudinary = require('../utils/cloudinaryConfig')
const upload = require('../utils/multer')


const { checkAuthenticated } = require('../utils/passport')

// Get dashboard page route
router.get('/:id/dashboard', checkAuthenticated, async (req, res) => {
    const plants = await Plant.find({}).exec()
    const user = await User.findById(req.params.id)
    const userPlants = await UserPlant.find({ owner: user._id }).populate('species')
    const userPlantsImageTags = await Promise.all(userPlants.map(async plant => {
        let imageTag;
        if (plant.images.length === 0) {
            imageTag = await createImageTag(plant.species.CloudinaryId, 230, 230);
        } else {
            imageTag = await createImageTag(plant.images[plant.images.length - 1].cloudinaryId, 230, 230);
        }
        return imageTag;

    }))
    const plantNames = {}
    plants.forEach((plant) => {
        plantNames[plant.CommonName] = plant.BotanicalName
    })
    try {
        res.render(`users/dashboard`, { plants: plants, locations: user.locations.reverse(), userPlants: userPlants, plantNames: plantNames, userPlantsImageTags: userPlantsImageTags })
    } catch (err) {
       console.log(err)
       res.redirect('users/login') 
    }
})

// Add a new location to the user route
router.post('/:id/locations', checkAuthenticated, async (req, res) => {
    try {
        User.findOneAndUpdate(
            { "_id": `${req.params.id}` }, 
            { $push: { locations: `${req.body.newLocation}` }}, 
            { upsert: true }, 
            function (err, data) { 
                console.log(err)
        })
        res.redirect(`/users/${req.params.id}/dashboard`)
    } catch (err) {
        console.log(err)
        res.redirect(`/users/${req.params.id}/dashboard/`)
    }
})

// Delete a location
router.delete('/:id/locations', checkAuthenticated, async (req, res) => {
    try {
        User.findOneAndUpdate(
            { "_id": `${req.params.id}` }, 
            { $pull: { locations: req.body.location }}, 
            function (err, data) { 
                if (err) {
                    console.log(err)
                }
        }) 
        UserPlant.updateMany(
            { "location" : req.body.location },
            { $set: { "location" : "No location assigned" }},
            function (err, data) {
                if (err) {
                    console.log(err)
                }
            }
        )
        res.redirect(`/users/${req.params.id}/dashboard`)
    } catch (err) {
        console.log(err)
        res.redirect(`/users/${req.params.id}/dashboard/`)
    }
})

// Edit a location
router.put('/:id/locations', checkAuthenticated, async (req, res) => {
    try {
        console.log('attempting to update location!', req.body.location, req.body.newLocation)
        User.findOneAndUpdate(
            { 
                "_id": `${req.params.id}`,
                "locations": req.body.location
            }, 
            {
                $set: { 'locations.$': req.body.newLocation}
            },
            function (err, data) { 
                if (err) {
                    console.log(err)
                }
        }) 
        UserPlant.updateMany(
            { "location" : req.body.location },
            { $set: { "location" : req.body.newLocation }},
            function (err, data) {
                if (err) {
                    console.log(err)
                }
            }
        )
        res.redirect(`/users/${req.params.id}/dashboard`)
    } catch (err) {
        console.log(err)
        res.redirect(`/users/${req.params.id}/dashboard/`)
    }
})



// Add a new note associated with a given plant
router.post('/plants/:id/notes', checkAuthenticated, async (req, res) => {
        if (req.body.body && req.body.date) {
            const plant = await UserPlant.findById(req.params.id)
            try {
                const note = new Note({
                    plant: req.params.id,
                    user: plant.owner.toString(),
                    body: req.body.body,
                    date: new Date(req.body.date)
            }).save(err => {
                if (err) { 
                    console.log(err)
                    res.sendStatus(500)
                } else {
                  res.redirect(`/users/plants/${req.params.id}`)
                }
            });
            } catch (err) {
                console.log(err)
                res.redirect(`/users/plants/${req.params.id}`)
            } 
        } else {
            res.sendStatus(204)
        }   
})

// Edit notes route
router.put('/plants/notes/:id', checkAuthenticated, async (req, res) => {
    try {
        Note.findOneAndUpdate(
            { "_id": `${req.params.id}`} , 
            { 
                body: req.body.body, 
                date: new Date(req.body.date)
            }, 
            { upsert: false }, 
            function (err, data) { 
                console.log(err)
        })
        res.redirect(`/users/plants/${req.body.plantId}`)     
    } catch (err) {
        console.log(err)
        res.redirect(`/users/plants/${req.body.plantId}`)     
    }
})

// Delete notes route
router.delete('/plants/notes/:id', checkAuthenticated, async (req, res) => {
    try {
        Note.findOneAndDelete(
            { _id: `${req.params.id}`} , 
            function (err, data) { 
                if (err) {
                 console.log(err)
                }
        })
        res.redirect(`/users/plants/${req.body.plantId}`)     
    } catch (err) {
        console.log(err)
        res.redirect(`/users/plants/${req.body.plantId}`)     
    }
})

// Add a new plant route
router.post('/:id/plants', checkAuthenticated, async (req, res) => {
    try {
        const species = await Plant.findOne({ BotanicalName : req.body.botanicalName })
        const plant = new UserPlant({
            location: req.body.location,
            species: species._id, 
            name: req.body.name || "Anonymous",
            wateringInterval: req.body.wateringInterval,
            lastWatered: new Date(req.body.lastWatered),
            lastFertilized: new Date(req.body.lastFertilized),
            lastRepotted: new Date(req.body.lastRepotted),
            owner: req.params.id
        }).save(err => {
            if (err) { 
              console.log(err)
              res.sendStatus(500)
            } else {
              res.redirect(`/users/${req.params.id}/dashboard/`)
            }
        });
    } catch (err) {
        console.log(err)
        res.redirect(`/users/${req.params.id}/dashboard/`)
    }
})

// Load plant detail page route
router.get('/plants/:id', checkAuthenticated, async (req, res) => {
    try {
        const plant = await UserPlant.findById(req.params.id).populate('species').exec()
        const notes = await Note.find({ plant: req.params.id })
        notes.sort((a, b) => b.date - a.date)
        const plantImageTags = []
        if (plant.images.length > 0) {
            for await (const image of plant.images) {
                const imageTag = await createImageTag(image.cloudinaryId, 350, 350);
                plantImageTags.push({ cloudinaryId: image.cloudinaryId, imageTag: imageTag, uploaded: image.uploaded })
            }
        } else {
            const imageTag = await createImageTag(plant.species.CloudinaryId, 350, 350);
            plantImageTags.push({ imageTag: imageTag, uploaded: new Date(Date.now()) })
        }
        res.render('users/userPlantShow', { plant: plant, plantImageTags: plantImageTags, notes: notes })
      } catch (err) {
        console.log(err)
        res.redirect(`/`)        
    }    
})

//Delete a user generated plant route
router.delete('/plants/:id', checkAuthenticated, async (req, res) => {
    const userId = req.body.userId
    const plant = await UserPlant.findById(req.params.id)
    const images = plant.images.map(x => x.cloudinaryId)
    try {
        for (const image of images) {
            cloudinary.uploader.destroy(image, function(result) { console.log(result) });
        }
        UserPlant.findOneAndDelete(
            { _id: `${req.params.id}`} , 
            function (err, data) {
                if (err) {
                    console.log(err)
                } 
        })
        Note.deleteMany(
            { plant: req.params.id }, 
             function (err) {
                if (err) {
                    console.log(err)  
                }
            });

      } catch (err) {
        if (err) {
            res.redirect(303, `/users/${userId}/dashboard/`)        
        }
      }
      res.redirect(303, `/users/${userId}/dashboard/`)
})

// Edit a user plant route
router.put('/plants/:id', checkAuthenticated, async (req, res) => {
    const userId = req.body.userId
    const nickname = req.body.nickname
    const location = req.body.location
    const wateringInterval = req.body.wateringInterval
    const lastWatered = req.body.lastWatered
    const lastFertilized = req.body.lastFertilized
    const lastRepotted = req.body.lastRepotted
    console.log(userId, nickname, location, wateringInterval, lastWatered, lastFertilized, lastRepotted)

    try {
        UserPlant.findOneAndUpdate(
            { "_id": `${req.params.id}`} , 
            { 
                name: nickname, 
                location: location,
                wateringInterval: wateringInterval,
                lastWatered: lastWatered,
                lastFertilized: lastFertilized,
                lastRepotted: lastRepotted
            }, 
            { upsert: false }, 
            function (err, data) { 
                console.log(err)
        })

      } catch (err) {
        if (err) {
            res.redirect(303, `/users/${userId}/dashboard/`)        
        }
      }
      res.redirect(303, `/users/plants/${req.params.id}`)
})

//Upload an image route
router.post('/plants/:id/images', upload.single('image'), async(req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {folder: 'user-uploaded-houseplants'})
      UserPlant.findOneAndUpdate(
        { "_id": `${req.params.id}` }, 
        { $push: { images: {'cloudinaryId': result.public_id, 'uploaded': new Date(Date.now())} }}, 
        function (err, data) { 
            console.log(err)
    })
    } catch (err) {
      console.log(err);
      res.redirect(303, `/users/plants/${req.params.id}`)
    }
    res.redirect(303, `/users/plants/${req.params.id}`)
  })

// Delete image route

router.delete('/plants/:id/images/', checkAuthenticated, async (req, res) => {
    try {
        await cloudinary.uploader.destroy(req.body.cloudinaryId, function(result) { console.log(result) });
        UserPlant.findOneAndUpdate(
            { "_id": `${req.params.id}` }, 
            { $pull: { images: { 'cloudinaryId': req.body.cloudinaryId } }}, 
            function (err, data) { 
                if (err) {
                    console.log(err)
                }
        }) 
    } catch (err) {
        console.log(err)
        res.redirect(303, `/users/plants/${req.body.plantId}`)     
    }
    res.redirect(303, `/users/plants/${req.body.plantId}`)     
})

// Edit image route

router.put('/plants/:id/images/', checkAuthenticated, async (req, res) => {
    try {
        console.log('attempting to update!', req.params.id, req.body.cloudinaryId)
        UserPlant.findOneAndUpdate(
            { '_id': `${req.params.id}`,
              'images.cloudinaryId' : req.body.cloudinaryId }, 
            { $set: { 'images.$.uploaded': req.body.uploaded }}, 
            function (err, data) { 
                if (err) {
                    console.log(err)
                }
        }) 
    } catch (err) {
        console.log(err)
        res.redirect(303, `/users/plants/${req.body.plantId}`)     
    }
    res.redirect(303, `/users/plants/${req.body.plantId}`)     
})

// Water route:
router.put('/plants/:id/water', checkAuthenticated, async (req, res) => {
    const userId = req.body.userId
    try {
        UserPlant.findOneAndUpdate(
            { "_id": `${req.params.id}`} , 
            { 
                lastWatered: new Date(Date.now())
            }, 
            { upsert: false }, 
            function (err, data) { 
                console.log(err)
        })
        res.redirect(303, `/users/${userId}/dashboard/`)        
    } catch (err) {
        console.log(err)
        res.redirect(303, `/users/${userId}/dashboard/`)        
    }
})

router.put('/plants/:id/fertilize', checkAuthenticated, async (req, res) => {
    const userId = req.body.userId
    try {
        UserPlant.findOneAndUpdate(
            { "_id": `${req.params.id}`} , 
            { 
                lastFertilized: new Date(Date.now())
            }, 
            { upsert: false }, 
            function (err, data) { 
                console.log(err)
        })
        res.redirect(303, `/users/${userId}/dashboard/`)        
    } catch (err) {
        console.log(err)
        res.redirect(303, `/users/${userId}/dashboard/`)        
    }
})
    
async function createImageTag (publicId, width, height) {
    // Create an image tag with transformations applied to the src URL
    let imageTag = cloudinary.image(publicId, {
        transformation: [
          { width: width, height: height, crop: 'thumb' }, 
          { radius: 50 },
        ],
      });
      return imageTag
};


module.exports = router;
