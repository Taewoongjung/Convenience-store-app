const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/', isNotLoggedIn, async(req, res, next) => {
    try {
        passport.authenticate('local', (authError, user, info) => {
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            if (info) {
                return res.send(`<script type="text/javascript">alert("${info.message}"); location.href="/";</script>`);
            }
            return req.login(user, (loginError) => {
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                console.log("@2: ", user.user_id);
                const token = jwt.sign({
                    user_id: user.user_id,
                    nickname: user.nickname
                }, process.env.JWT_SECRET, {
                    expiresIn: '7m', // 1분
                    issuer: 'taewoongjung',
                });
                return res.json({
                    result: {
                        userId: user.user_id,
                        nickname: user.nickname,
                        token,
                    },
                    isSuccess: 'true',
                    code: 200,
                    message: '로그인 성공'
                });
            });
        })(req, res, next);
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;