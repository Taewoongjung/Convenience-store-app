const express = require('express');
const { User } = require('../models');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.user && req.user.user_id || null },
    });
    res.render('login', {
      user
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
