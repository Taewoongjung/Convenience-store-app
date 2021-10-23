const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    console.log("body : ", email, nick, password);
    try {
        const exUser = await User.findOne({ where: {email} });
        if (exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email: email,
            nickname: nick,
            password: hash,
        });

        const primaryKeyOfIt = await User.findOne({ where: { email: email, nickname: nick }});

        const token = jwt.sign({
            id: primaryKeyOfIt.id
        }, process.env.JWT_SECRET, {
            expiresIn: '1m', // 1분
            issuer: 'taewoongjung',
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            userId: primaryKeyOfIt.id,
            token,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;