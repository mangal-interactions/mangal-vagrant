var conf = require('../config/oauth');
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth2').Strategy
var db = require('../models');


module.exports = function(passport) {
  // Set Authentification Strategy
  // configure oauth2 strategy for orcid use
  const oauth2 = new OAuth2Strategy(conf,
    function(req, accessToken, refreshToken, profile, params, done) {
      var user = db.user.findOrCreate({
          where: {
            name: profile.name,
            orcid: profile.orcid,
            access_token: profile.access_token
          }
          }).spread(function(user, created) {
          return done(null, user);
        });
    });

  passport.use(oauth2);

  // serialize & deserialize create information for the express-session that references a user in the database
  passport.serializeUser(function(user, cb) { // id store in cookie
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) { // retrieve id from cookie and perform id request on user table
    db.user.findById(id).then(function(profile) {
      var user = profile.get({
        plain: true
      });
      cb(null, user);
    });
  });

};