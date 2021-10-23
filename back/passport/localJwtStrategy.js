const passport = require('passport');
const bcrypt = require('bcrypt');
const passportJWT = require("passport-jwt").Strategy;
// const JWTStrategy = passportJWT.Strategy;
const { ExtractJwt } = passportJWT;

const { User } = require('../models');

module.exports = () => {
  passport.use(new passportJWT({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: global.config.secret,
  }, async (payload, done) => {
    try {
      const exUser = await User.findOne({ email: payload.email });
      console.log("@ : ", payload.email);
      if (!exUser) {
        return done(null, false, { message: '유저가 일치하지 않습니다.' });
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
