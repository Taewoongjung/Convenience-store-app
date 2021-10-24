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
            console.log("?? : ", info.code);
            if (info.code === 203) {
                return res.json({
                    isSuccess: false,
                    code: 203,
                    message: '가입되지 않은 회원입니다.'
                });
            } else if (info.code === 204) {
                return res.json({
                    isSuccess: false,
                    code: 204,
                    message: '비밀번호가 일치하지 않습니다.'
                });
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

router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',  // kakao 로그인 실패
}), (req, res) => {
    console.log("@: ", req.user.user_id);

    const token = jwt.sign({
        user_id: req.user.user_id,
        nickname: req.user.nickname,
    }, process.env.JWT_SECRET, {
        expiresIn: '7m', // 1분
        issuer: 'taewoongjung',
    });
    return res.json({
        result: {
            userId: req.user.user_id,
            nickname: req.user.nickname,
            token,
        },
        isSuccess: 'true',
        code: 201,
        message: '카카오 로그인 성공'
    });
});


module.exports = router;