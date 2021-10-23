const express = require('express');
const passport = require('passport');
const sanitize = require('sanitize-html');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password, password_re } = req.body;
    console.log("body : ", email, nick, password);
    try {
        const exUser = await User.findOne({ where: { email: email } });
        const exNick = await User.findOne({ where: { nickname: nick } });
        if (exUser) {
            return res.send(`<script type="text/javascript">alert("이미 가입된 이메일입니다."); location.href="/pages/signup";</script>`);
        }
        else if (exNick) {
            return res.send(`<script type="text/javascript">alert("사용할 수 없는 닉네임입니다."); location.href="/pages/signup";</script>`);
        }
        else if (password !== password_re) {
            return res.send(`<script type="text/javascript">alert("비밀번호가 맞지 않습니다."); location.href="/pages/signup";</script>`);
        }
        sanitize(password);
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
            if (info) {
                return res.send(`<script type="text/javascript">alert("${info.message}"); location.href="/";</script>`);
            }
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