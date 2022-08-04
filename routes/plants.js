const express = require('express')
const router = express.Router()
const Plant = require('../models/plant.js')
const upload = require('../utils/multer')
const cloudinary = require('../utils/cloudinaryConfig')


router.get('/search', async (req, res) => {
  let query = Plant.find().limit(20)
  if (req.query.CommonName != null && req.query.CommonName != '') {
    query = query.regex('CommonName', new RegExp(req.query.CommonName, 'i'))
  }
  if (req.query.BotanicalName != null && req.query.BotanicalName != '') {
    query = query.regex('BotanicalName', new RegExp(req.query.BotanicalName, 'i'))
  }
  if (req.query.Light != null && req.query.Light != '') {
    query = query.regex('Light', new RegExp(req.query.Light, 'i'))
  }
  if (req.query.Temperature != null && req.query.Temperature != '') {
    query = query.regex('Temperature', new RegExp(req.query.Temperature, 'i'))
  }
  if (req.query.RelativeHumidity != null && req.query.RelativeHumidity != '') {
    query = query.regex('RelativeHumidity', new RegExp(req.query.RelativeHumidity, 'i'))
  }
  if (req.query.Water != null && req.query.Water != '') {
    query = query.regex('Water', new RegExp(req.query.Water, 'i'))
  }

  try {
    const plants = await query.exec()
    let plantsImageTags = await Promise.all(plants.map(async plant => {
      const imageTag = await createImageTag(plant.CloudinaryId, 230, 230);
      return imageTag;
    }))
    if (req.query.CommonName !== undefined || 
        req.query.BotanicalName !== undefined ||
        req.query.Light !== undefined ||
        req.query.Temperature !== undefined ||
        req.query.RelativeHumidity !== undefined ||
        req.query.Water !== undefined) {
      res.render('plants/search', {
        plants: plants,
        plantsImageTags: plantsImageTags,
        searchOptions: req.query,
        queryRan: true
      })
    } else {
      res.render('plants/search', {
        plants: [],
        plantsImageTags: [],
        searchOptions: req.query,
        queryRan: false
      })
    }
  } catch {
    console.log('error!')
    res.redirect('/')
  }
})

// Plant Quiz Route
router.get('/quiz', async (req, res) => {
  try {
    res.render('plants/quiz')
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

// light and humidity can each have 2 values
//Plant Quiz Result
router.get('/quiz/result', async (req, res) => { 
  let query = Plant.findOne()
  if (req.query.Light != null && req.query.Light != '') {
      query = query.regex('Light', new RegExp(req.query.Light, 'i'))
  }
  if (req.query.Temperature != null && req.query.Temperature != '') {
    query = query.regex('Temperature', new RegExp(req.query.Temperature, 'i'))
  }
  if (req.query.RelativeHumidity != null && req.query.RelativeHumidity != '') {
      query = query.regex('RelativeHumidity', new RegExp(req.query.RelativeHumidity, 'i'))
  }
  if (req.query.Water != null && req.query.Water != '') {
    query = query.regex('Water', new RegExp(req.query.Water, 'i'))
  }
  try {
    const plant = await query.exec()
    if (plant) {
      const plantImageTag = await createImageTag(plant.CloudinaryId, 400, 400);
    res.render('plants/quiz-result', {
        plant: plant,
        plantImageTag: plantImageTag
    })
    } else {
      res.render('plants/quiz-result', {
        plant: null,
        plantImageTag: null
    })
    }
    } catch (err) {
    console.log(err)
    res.redirect('/plants/quiz')
  }
})
// Get all plant names
router.get('/names', async (req, res) => {
  const plants = await Plant.find({}).exec()
  const alphabetizedPlantNames = []
  plants.forEach((plant) => {
      alphabetizedPlantNames.push(plant.CommonName)
      alphabetizedPlantNames.push(plant.BotanicalName)
  })
  alphabetizedPlantNames.sort();
  try {
      res.json({ alphabetizedPlantNames: alphabetizedPlantNames })
  } catch (err) {
     console.log(err)
     res.sendStatus(500)
  }
})

// Show Plant Route
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id).exec()
    const plantImageTag = await createImageTag(plant.CloudinaryId, 350, 350);
    const allPlants = await Plant.find();
    const similarPlants = await findSimilar(plant, allPlants);
    const similarPlantsImageTags = await Promise.all(similarPlants.map(async plant => {
      const imageTag = await createImageTag(plant.CloudinaryId, 250, 250);
      return imageTag;
    }))
    //const similarPlantsImageTag 
    res.render('plants/show', { plant: plant, plantImageTag: plantImageTag, similarPlants: similarPlants, similarPlantsImageTags: similarPlantsImageTags})
  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})


router.get('/', async (req, res) => {
  try{
    let plant = await Plant.find();
    res.json(plant);
  } catch (err) {
    console.log(err)
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

function findSimilar (plant, plantsArray) {
  return plantsArray.filter(function (plantToBeCompared) {
    if (plant.BotanicalName === plantToBeCompared.BotanicalName) return false
    if (this.count >= 8) return false;
    if (plant.BotanicalName.split(" ") === plantToBeCompared.BotanicalName.split(" ")) {
      this.count++
      return plantToBeCompared
    } else if (atLeastFourPropertiesSame(plant, plantToBeCompared)) {
      this.count++
      return plantToBeCompared
    }
  }, {count: 0})
}

function atLeastFourPropertiesSame (item1, item2) {
  let similarity = 0
  if (item1.Light === item2.Light) similarity++
  if (item1.Temperature === item2.Temperature) similarity++
  if (item1.RelativeHumidity === item2.RelativeHumidity) similarity++
  if (item1.Water === item2.Water) similarity++
  if (item1.SuggestedSoilMix === item2.SuggestedSoilMix) similarity++

  if (similarity >= 4) return true;
  else return false;
}

module.exports = router