const express = require('express');
const router = express.Router();
const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1429766",
    key: "0badd11ed0483edfa1ed",
    secret: "401775328f42868a9bee",
    cluster: "us2",
    useTLS: true
});

router.get('/', (req, res) => {
    res.send('submitWO');
});

router.post('/', (req, res) => {
    pusher.trigger('my-channel', 'my-event', {
        message: req.body.message
        // os: req.body.os
    });
    res.json('')

    // return res.json({success: true, message: 'Thank you for voting'})
});

module.exports = router;