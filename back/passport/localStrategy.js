const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => { // Local Strategy
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (username, password, done) => {
    try {
      const exUser = await User.findOne({ where: { email: username } });
      console.log("@@@ : ", username);
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { code: 204, message: '비밀번호가 일치하지 않습니다.' });
        }
      } else {
        done(null, false, { code: 203, message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
