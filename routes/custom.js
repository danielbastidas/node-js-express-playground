const express = require('express');
const router = express.Router();

router.get('/route1', (req, res) => {
    res.send("See the server log and you should see a message that only applies to routes in this file ")
})

router.get('/route2', (req, res) => {
    res.send("See the server log and you should see a message that only applies to routes in this file ")
})

module.exports = router