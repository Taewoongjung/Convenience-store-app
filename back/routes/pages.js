const express = require('express');
const { User } = require('../models');
const { verifyToken } = require('./middlewares');
const router = express.Router();

router.get('/signup', async(req, res, next) => {
    res.render('signup.html');
});

router.get('/test', verifyToken, async(req, res, next) => {
    res.render('test.html');
});

module.exports = router;