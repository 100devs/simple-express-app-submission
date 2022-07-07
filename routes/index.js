const express = require('express');
const router = express.Router();

//login page
router.get('/', (req, res) => {
    res.render('index');
});

//register page
router.get('/user', (req, res) => {
    res.render('user');
});

module.exports = router;