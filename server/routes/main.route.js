// import express
const express = require('express');
// import controllers
const mainController = require('../controllers/main.controller');

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will
// take control of requests starting with path /record.
const router = express.Router();

router.get('/', mainController.baseLanding);
router.get('/api', mainController.apiLanding);

// export to use in server.js
module.exports = router;
