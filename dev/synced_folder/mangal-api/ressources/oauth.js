var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var db = require('../models');

module.exports = function(passport) {

  var options = { // not required
    missingTokenMessage: 'token is missing'
  };

  const bearer = new BearerStrategy(options,
    function(token, done) {
      db.user.findOne({
          where: {
            access_token: token
          }
        })
        .then(function(user) {
          if (!user) {
            return done(null, false);
          }
          return done(null, user, {
            scope: 'all'
          });
        })
        .catch(function(err) {
          return done(err);
        });
    }
  );

  // Set Bearer Authentification Strategy
  passport.use(bearer);

};