const express = require('express');
const passport = require('passport');
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

    } catch (error) {
        console.log(error);
        return next(error);
    }
});

router.get('/token', isNotLoggedIn, async(req, res, next) => {
    try {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            // if (info) {
            //     return res.send(`<script type="text/javascript">alert("${info.message}"); location.href="/";</script>`);
            // }
            return req.login(user, (loginError) => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                console.log("@2: ", user.id);
                const token = jwt.sign({
                    id: user.id,
                    nickname: user.nickname
                }, process.env.JWT_SECRET, {
                    expiresIn: '1m', // 1분
                    issuer: 'taewoongjung',
                });
                return res.json({
                    code: 200,
                    message: '토큰이 발급되었습니다',
                    userId: user.id,
                    nickname: user.nickname,
                    token,
                });
            });
        })(req, res, next);

        // const primaryKeyOfIt = await User.findOne({ where: { email: email }});
        //
        // const token = jwt.sign({
        //     id: primaryKeyOfIt.id
        // }, process.env.JWT_SECRET, {
        //     expiresIn: '1m', // 1분
        //     issuer: 'taewoongjung',
        // });
        // return res.json({
        //     code: 200,
        //     message: '토큰이 발급되었습니다',
        //     userId: primaryKeyOfIt.id,
        //     token,
        // });

    } catch (error) {
        console.log(error);
        return next(error);
    }
})

module.exports = router;