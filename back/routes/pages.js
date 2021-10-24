const express = require('express');
const { User } = require('../models');
const { verifyToken } = require('./middlewares');
const router = express.Router();

router.use((req, res, next) => { // 모든 라우터에 회원정보 넣어주기
    res.locals.user = req.user;
    next();
});

router.get('/signup', async(req, res, next) => {
    res.render('signup.html');
});

router.get('/test', verifyToken, async(req, res, next) => {
    console.log("user id : ", req.decoded.user_id);
    res.render('test.html');
});

module.exports = router;