const jwt = require('jsonwebtoken');
const User = require('../models/User');

  module.exports = {
    requireAuth: (req, res, next) => {
    const token = req.cookies.jwt;

    // verify and check the token
    if(token) {
      jwt.verify(token, 'super secret', (err, decodedToken) => {
        if(err) {
          res.redirect('/login');
        } else {
          // console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  },

  // Check current user
  checkUser: (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
      jwt.verify(token, 'super secret', async(err, decodedToken) => {
        if(err) {
          // console.log(err);
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id)
          res.locals.user = user;
          // console.log(user);
          next()
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  }
};
