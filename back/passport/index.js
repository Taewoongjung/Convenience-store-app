const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
// const google = require('./googleStrategy');

const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser(async(id, done) => {
    User.findOne({ where: { user_id: id } })
        .then(user => done(null, user))
        .catch(err => done(err));
  });

  local();
  kakao();
  // google();
};