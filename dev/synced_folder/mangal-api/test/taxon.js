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

describe("Operation on ressources", function() {

    describe("POSTing a taxon", function() {

        it("should work if the taxon is unique", function(done) {

            var data = [{
                "original_name": "Alces alces",
                "network_id": 1
            }, {
                "original_name": "Alces alces",
                "network_id": 1
            }];

            chai.request(server)
              .post('/api/v0/taxons')
              .set('Authorization','bearer 12345')
              .send(data[0])
              .end((err, res) => {
                chai.request(server)
                  .post('/api/v0/taxons')
                  .set('Authorization','bearer 12345')
                  .send(data[1])
                  .end((err, res) => {
                    res.should.have.status(400);
                    done();
                  });
              });

        });

        // TODO: apply test on the taxon_backbone table
        // it("should not work if the taxon has no name", function(done) {
        //     var data = {
        //         "vernacular": "Moose",
        //         "tsn": 180604
        //     };
        //
        //     chai.request(server)
        //       .post('/api/v0/taxons')
        //       .set('Authorization','bearer 12345')
        //       .send(data[0])
        //       .end((err, res) => {
        //         res.body.message.should.eql('notNull Violation: name cannot be null');
        //         res.should.have.status(400);
        //         done();
        //       });
        // });

    });

    describe("GETting a taxon", function() {

        // TODO Add a test to get /api/v0/taxon/{id} where {id} is the mangal id
        // of a previously added taxon.
        // it("should work when calling /api/v0/taxon/id"), function(done) {};

        it("should return 200 status and empty json/body if ID doesn't exist", function(done) {

          chai.request(server)
            .get('/api/v0/taxons?tsn=0000')
            .set('Authorization','bearer 12345')
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });

        });

        it("should return a taxon with the correct ID if it exists", function(done) {

            var data = {
                "original_name": "Echiura",
                "bold": 27333
            };

            chai.request(server)
              .post('/api/v0/taxons')
              .send(data)
              .set('Authorization','bearer 12345')
              .end((err, res) => {
                res.should.have.status(201);
                chai.request(server)
                  .get('/api/v0/taxons?name=Echiura')
                  .set('Authorization','bearer 12345')
                  .end((err, res) => {
                    res.should.have.status(200);
                    done();
                  });
              });

        });

    })
})
