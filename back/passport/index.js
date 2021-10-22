const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/user');

module.exports = () => {
    local();
};