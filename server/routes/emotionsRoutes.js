const { application } = require('express');
const express = require('express')
const router = express.Router();//router level middleware - Route handlers enable you to define multiple routes for a path rather than just using eg get

// see about different ways of routing https://expressjs.com/en/guide/using-middleware.html

const emotionsController = require('../controllers/emotionsController'); //import the emotions controller
/*  
* App Routes
*/

router.get('/', emotionsController.homepage); //create the route
router.get('/emotion/:id', emotionsController.exploreEmotion) //creating the route to get a more detailed view of each emotion when you click on it
router.get('/categories', emotionsController.exploreCategories); // all emotions (categories)
router.post('/search', emotionsController.searchEmotion);
router.get('/submit-emotion',emotionsController.submitEmotion);
router.post('/submit-emotion',emotionsController.submitEmotionOnPost);
router.put('/emotion/:id',emotionsController.updateEmotion)
router.get('/categories/:id', emotionsController.exploreCategoriesById);
router.delete('/delete-emotion',emotionsController.deleteEmotion);
router.get('/recent-emotions',emotionsController.recentEmotions);


module.exports = router