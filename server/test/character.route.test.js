const mongoose = require('mongoose');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const Character = require('../models/character.model');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Server Character Route', () => {
  // remove all entries
  beforeEach((done) => { // Before each test we empty the database
    Character.deleteMany({}, (err) => {
      done();
    });
  });
  // GET /api/character all characters
  it('GET /api/character all characters', (done) => {
    chai.request(server)
      .get('/api/character')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
  });

  it('GET /api/character/:name character by name', (done) => {
    const testChar = new Character({ name: 'Vegeta', planet: 'Earth' });
    testChar.save((err, character) => {
      chai.request(server)
        .get(`/api/character/${testChar.name}`)
        .send(testChar)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(testChar.name);
          res.body.should.have.property('planet').eql(testChar.planet);
          done();
        });
    });
  });

  it('GET /api/character/ID/:id character by ID', (done) => {
    const testChar = new Character({ name: 'BlackGoku', planet: 'Earth' });
    testChar.save((err, character) => {
      chai.request(server)
        .get(`/api/character/ID/${testChar.id}`)
        .send(testChar)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('name').eql(testChar.name);
          res.body.should.have.property('planet').eql(testChar.planet);
          done();
        });
    });
  });
  it('POST /api/character/add add character', (done) => {
    const testChar = new Character({ name: 'BlackGoku', planet: 'Earth' });

    chai.request(server)
      .post('/api/character/add')
      .send(testChar)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name').eql(testChar.name);
        res.body.should.have.property('planet').eql(testChar.planet);
        done();
      });
  });
  it('PUT /api/character/update/:id update character', (done) => {
    const testChar = new Character({ name: 'SS3 Goku', planet: 'Earth' });
    const updateTestChar = new Character({ name: 'Son Goku', planet: 'Earth' });
    // add character before update
    chai.request(server)
      .post('/api/character/add')
      .send(testChar)
      .end();
    // update character
    chai.request(server)
      .put(`/api/character/update/${testChar.id}`)
      .send(updateTestChar)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
  it('DELETE /api/character/delete/:id delete character', (done) => {
    const testChar = new Character({ name: 'Bulma', planet: 'Earth' });
    // add character before update
    chai.request(server)
      .post('/api/character/add')
      .send(testChar)
      .end();
    // update character
    chai.request(server)
      .delete(`/api/character/delete/${testChar.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
