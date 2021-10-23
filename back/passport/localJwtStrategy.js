const passport = require('passport');
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const { User } = require('../models');

module.exports = () => {
  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.JWT_SECRET
      }, async (jwtPayload, done) => {
        try{
          return UserModel.findOneById(jwtPayload.id)
              .then(user => {
                return done(null, user);
              })
              .catch(err => {
                return done(err);
              });
        } catch (error) {
          console.log(error);
          next(error);
        }
      }
  ));
};
