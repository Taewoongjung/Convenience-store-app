const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async(req, res, next) => {
    res.render('signup.html');
})

module.exports = router;