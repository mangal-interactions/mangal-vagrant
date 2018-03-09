// List module dependancies
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var db = require('./models');

// Init express app
var app = express();


// Init all dependencies used by the app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Init Databases
if (process.env.NODE_ENV == 'development') {
  db.sequelize.sync();
};

// Init REST ressources
require('./ressources').initialize(app);


// start server
var port = process.env.PORT_MANGAL_API || 3000;
server = http.createServer(app);
server.listen(port);

module.exports = server;
