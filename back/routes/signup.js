const express = require('express');
const sanitize = require('sanitize-html');
const bcrypt = require('bcrypt');
const { isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
    const { email, nickname, password } = req.body;
    console.log("body : ", email, nickname, password);
    try {
        const exUser = await User.findOne({ where: { email: email } });
        const exNick = await User.findOne({ where: { nickname: nickname } });
        if (exUser) {
            return res.send(`<script type="text/javascript">alert("이미 가입된 이메일입니다."); location.href="/pages/signup";</script>`);
        }
        else if (exNick) {
            return res.send(`<script type="text/javascript">alert("사용할 수 없는 닉네임입니다."); location.href="/pages/signup";</script>`);
        }
        sanitize(password);
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email: email,
            nickname: nickname,
            password: hash,
        });
        return res.json({
            code: 200,
            mssage: "회원가입 완료"
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;