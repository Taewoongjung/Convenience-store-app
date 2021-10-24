const express = require('express');
const sanitize = require('sanitize-html');
const bcrypt = require('bcrypt');
const { isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/', isNotLoggedIn, async (req, res, next) => {
    const { email, nickname, password, password_re } = req.body;
    console.log("body : ", email);
    try {
        const exUser = await User.findOne({ where: { email: email } });
        const exNick = await User.findOne({ where: { nickname: nickname } });

        if (email === '') {
            return res.json({
                isSuccess: false,
                code: 103,
                message: '이메일칸이 비어있습니다.'
            });
        }
        else if (nickname === '') {
            return res.json({
                isSuccess: false,
                code: 104,
                message: '닉네임칸이 비어있습니다.'
            });
        }
        else if (password === '') {
            return res.json({
                isSuccess: false,
                code: 105,
                message: '패스워드를 입력하세요.'
            });
        }
        else if (password_re === '') {
            return res.json({
                isSuccess: false,
                code: 106,
                message: '패스워드를 다시 입력하세요.'
            });
        }
        else if (exUser) {
            return res.json({
                isSuccess: false,
                code: 101,
                message: '이미 가입된 이메일입니다.'
            });
        }
        else if (exNick) {
            return res.json({
                isSuccess: false,
                code: 102,
                message: '사용할 수 없는 닉네임 입니다.'
            });
        }

        sanitize(password);
        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email: email,
            nickname: nickname,
            password: hash,
        });

        return res.json({
            result: {
                userId: newUser.user_id
            },
            isSuccess: true,
            code: 200,
            mssage: "회원가입 완료",
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
});

module.exports = router;