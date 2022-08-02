const mongoose = require('mongoose');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Character = require('../models/character.model');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Server Main Route', () => {
  // remove all entries
  beforeEach((done) => { // Before each test we empty the database
    Character.deleteMany({}, (err) => {
      done();
    });
  });
  // GET / redirect to /api
  it('GET / redirect to /api', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  // GET /api
  it('GET /api', (done) => {
    chai.request(server)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});
