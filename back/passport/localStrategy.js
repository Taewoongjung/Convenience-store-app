const passport = require('passport');
const local_strategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/user');

module.exports = () => {
    passport.use(new local_strategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async(email, password, done) => {
        console.log('local');
        try{
            const ex_user = await User.findOne({
                where: {email: email}
            });
            if(!ex_user){
                done(null, false, {message: 'You did not signup yet'});
            }
            else{
                const result = await bcrypt.compare(password, ex_user.password);
                if(!result){
                    done(null, false, {message: 'It is a wrong password'});
                }
                const token = jwt.sign({
                    email,
                    password,
                }, process.env.JWT_SECRET, {
                    expiresIn: '5m',
                    issuer: 'tae',
                });
                done(null, token);
            }
        }
        catch(err){
            console.error(err);
            done(err);
        }
    }));
};