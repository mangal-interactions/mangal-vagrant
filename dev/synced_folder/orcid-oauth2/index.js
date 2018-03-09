// List module dependancies
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var http = require('http');
var passport = require('passport');
var db = require('./models');

// Init express app
var app = express();

// Config on express-session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

// Init all dependencies used by the app
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// Init Databases

// test authentification
db.sequelize
    .authenticate()
    .then(function(success) {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

// sync DB
if (process.env.NODE_ENV == 'development') {
  db.sequelize.sync({
      force: true
  });
};

// Init oauth middleware
require('./oauth')(passport);

// Basic oauth routes
app.get('/auth', passport.authenticate('oauth2'));
app.get('/auth/callback', passport.authenticate('oauth2', {
    successRedirect: '/auth/profile',
    failureRedirect: '/auth/failed'
}));

app.get('/auth/profile', function(req,res){
  console.log(req.user);
  if(typeof req.user === 'undefined'){
    res.status(204).send('No user profile');
  } else {
    res.status(200).json(req.user);
  };
});

app.get('/auth/failed', function(req,res){
  res.status(403).send('Authorization denied by user');
});

app.get('/auth/logout', function(req,res){
  req.logout();
  res.redirect('/auth');
  // NOTE: Clear the app session, but not the ORCID session.
});

// start server
var port = process.env.PORT_MANGAL_OAUTH || 3000;
server = http.createServer(app);
server.listen(port);

module.exports = server;
