const express = require('express');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { route } = require('.');
const { verifyToken } = require('./middlewares');

const router = express.Router();

router.get('/', (req, res, next) => {
    try{
        res.sendFile(path.join(__dirname, '../views/login.html'));
    }
    catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    passport.authenticate('local', {session: false}, (authError, token, info) => {
        console.log('login');
        if(authError){
            console.log(authError);
            return next(authError);
        }
        if(!token){
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(token, {session: false}, (loginError) => {
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            res.cookie('jwt', token, {httpOnly: true}
                .status(200)
                .json({ loginSuccess: true })
            );
            // res.redirect('/login/mypage');
        })
    })(req, res, next);
});

router.post('/login', async (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);

                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id })
            })
        })
    })
});
router.post('/logout', verifyToken, (req, res, next) => {
    console.log(req.url);
    req.logOut();
    res.clearCookie('jwt');
    res.redirect('/');
})

router.get('/mypage', verifyToken, (req, res, next) => {
    res.render('mypage', {user: req.data});
});

module.exports = router;