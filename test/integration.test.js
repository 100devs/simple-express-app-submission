const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = chai.assert

const app = require('../index.js')
chai.use(chaiHttp)

describe("GET requests", () => {
    it('/api/persons Gets a list of all entries', (done) => {
        chai
            .request(app)
            .get("/api/persons")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                assert.isArray(res.body, "meant to deliver an array")
                assert.lengthOf(res.body, 4, "default length of book should be 4")
                done()
            })
    })
    it('/api/persons/1 Gets a entry with id:1', (done) => {
        chai
            .request(app)
            .get("/api/persons/1")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                assert.isObject(res.body, "meant to deliver an object")
                assert.include(res.body, {name:"Arto Hellas"})
                assert.include(res.body, {id: 1})
                done()
            })
    })
    it('/info gets some basic info as html', (done) => {
        chai
            .request(app)
            .get("/info")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                assert.isString(res.text, "meant to stringy data (Hopefully HTML)")
                assert.include(res.text, "PhoneBook has info for 4 people")
                done()
            })
    })
})
describe("POST requests", () => {
    it('/api/persons Lets us add an entry', (done) => {
        const newEntry = {
            "id": 1000,
            "name": "Chai Drinker",
            "number": "734-33353"}
        chai
            .request(app)
            .post("/api/persons")
            .send(newEntry)
            .end((err,res) => {
                assert.equal(res.statusCode, 200)
                assert.include(res.body, {name: newEntry.name})
                assert.include(res.body, {number: newEntry.number})
                done()
            })
    })
    it('Now has an extra entry', (done) => {
        chai
            .request(app)
            .get("/api/persons")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                assert.isArray(res.body, "meant to deliver an array")
                assert.lengthOf(res.body, 5, "default length of book should be 4")
                done()
            })
    })
})
describe("DELETE requests", () => {
    it('/api/persons/1 Removes entry with id:1', (done) => {
        chai
            .request(app)
            .del("/api/persons/1")
            .end((err,res) => {
                assert.equal(res.statusCode, 204)
                done()
            })
    })
    it('Now back to 4 entries without id:1', (done) => {
        chai
            .request(app)
            .get("/api/persons")
            .end((err, res) => {
                assert.equal(res.statusCode, 200)
                assert.isArray(res.body, "meant to deliver an array")
                assert.lengthOf(res.body, 4, "default length of book should be 4")
                assert.notInclude(res.body.map(e=>e.id), 1, "should not include id:1")
                done()
            })
    })
})
