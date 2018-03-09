var db = require('../models');

var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();

// Set app test
var server = require('../index.js')
var addr = 'localhost:3000'

chai.use(chaiHttp);

// Clean and add token access in the db
beforeEach(function(done) {
  db.sequelize.sync({
    force: true
  }).then(function() {
    // insert fake token
    db.user.create({
      name: 'Han Solo',
      access_token: '12345'
    }).then(function() {
      done();
    });
  });
});

describe("Operation on user authentification", function() {

  describe("Without token, user cannot GET ressources", function() {

    it("attributes", function(done) {
      chai.request(server)
        .get('/api/v0/attributes')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("references", function(done) {
      chai.request(server)
        .get('/api/v0/refs')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("users", function(done) {
      chai.request(server)
        .get('/api/v0/users')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("traits", function(done) {
      chai.request(server)
        .get('/api/v0/traits')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("environments", function(done) {
      chai.request(server)
        .get('/api/v0/environments')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("taxons", function(done) {
      chai.request(server)
        .get('/api/v0/taxons')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("datasets", function(done) {
      chai.request(server)
        .get('/api/v0/datasets')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("networks", function(done) {
      chai.request(server)
        .get('/api/v0/networks')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("interactions", function(done) {
      chai.request(server)
        .get('/api/v0/interactions')
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

  });

  describe("With appropriate token, user can access GET ressources", function() {
    it("attributes", function(done) {
      chai.request(server)
        .get('/api/v0/attributes')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("references", function(done) {
      chai.request(server)
        .get('/api/v0/refs')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("users", function(done) {
      chai.request(server)
        .get('/api/v0/users')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("traits", function(done) {
      chai.request(server)
        .get('/api/v0/traits')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("environments", function(done) {
      chai.request(server)
        .get('/api/v0/environments')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("taxons", function(done) {
      chai.request(server)
        .get('/api/v0/taxons')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("datasets", function(done) {
      chai.request(server)
        .get('/api/v0/datasets')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("networks", function(done) {
      chai.request(server)
        .get('/api/v0/networks')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("interactions", function(done) {
      chai.request(server)
        .get('/api/v0/interactions')
        .set('Authorization','bearer 12345')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

});