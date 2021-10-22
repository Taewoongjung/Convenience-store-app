const User = require('../models/user');
const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');
const jwtStrategy = require('passport-jwt').Strategy;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrkey: process.env.JWT_SECRET,
};

passport.use(new jwtStrategy(opts, async (payload, done) => {
    console.log(payload);
    done(null, payload);
}));