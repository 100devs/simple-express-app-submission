const express = require('express');
const router = express.Router();
// const WorkOrder = require('../models/workOrder.js');

router.get('/', (req, res) => {
    res.render('create');
});

module.exports = router;