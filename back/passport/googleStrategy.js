const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_ID);

const User = require('../models/user');

module.exports = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/login/google/callback',
    }, async (accessToken, refreshToken, profile, done) => {
        console.log('google profile', profile);
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'google' },
            });
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.google_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'google',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));
};