var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../server');
var User = require('../models/users');
var Interest = require('../models/interest')
let passwordHash = require('password-hash');

describe('Interest', () => {

  let token = ''
  let user_id = ''
  let newInterest_id = ''

  beforeEach( (done) => {
    var newUser = User({
      name: "rudy",
      email: "rudy@haha.com",
      username: "rudy",
      password: passwordHash.generate("haha"),
      interestArr: []
    })

    newUser.save( (err, user) => {
      newUser_id = user._id;
      user_id = user._id

      chai.request(server)
      .post('/auth/signin')
      .send({
        username: "rudy",
        password: "haha"
      })
      .end( (err, result) => {
        // console.log("***** signin", result.body)
        token = result.body.token

        newInterest = Interest({
          name: "Japanese"
        })
        newInterest.save( (err, interest) => {
          newInterest_id = interest._id
          done()
        })

      })

    })
  });

  afterEach( done => {
    User.remove({}, err => {

    })

    Interest.remove({}, err => {
      done();
    })
  });


  it('GET - /interest - get all interests', (done) => {
    chai.request(server)
    .get('/interest')
    .end( (err, result) => {
      // console.log("*** get all interests", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('array')

      result.body[0].should.have.property('name')

      result.body[0].name.should.equal('Japanese')

      done()
    })
  });

  it('GET - /interest/:id - get one interest', (done) => {
    chai.request(server)
    .get(`/interest/${newInterest_id}`)
    .set('token', token)
    .end( (err, result) => {
      // console.log("*** get one interests", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('name')

      result.body.name.should.equal('Japanese')

      done()
    })
  });


  it('POST - /interest - insert one interest', (done) => {
    chai.request(server)
    .post(`/interest`)
    .set('token', token)
    .send({
      name: 'Western'
    })
    .end( (err, result) => {
      console.log("*** insert one interest", result.body)
      result.should.have.status(200)
      result.should.be.an('object')

      result.body.should.have.property('name')

      result.body.name.should.equal('Western')
      done()
    })
  });


  it('PUT - /interest/:id - edit one interest', (done) => {
    chai.request(server)
    .put(`/interest/${newInterest_id}`)
    .set('token', token)
    .send({
      name: 'Indonesian'
    })
    .end( (err, result) => {
      console.log("*** edit one interest", result.body)
      result.should.have.status(200)
      result.should.be.an('object')

      result.body.should.have.property('name')

      result.body.name.should.equal('Indonesian')

      done()
    })
  });


  it('DELETE - /interest/:id - delete one interest', (done) => {
    chai.request(server)
    .del(`/interest/${newInterest_id}`)
    .set('token', token)
    .end( (err, result) => {
      console.log("*** edit one interest", result.body)
      result.should.have.status(200)
      result.should.be.an('object')

      chai.request(server)
      .get('/interest')
      .end( (err, result) => {
        console.log('*** check total interest', result.body);
        result.should.have.status(200)
        result.body.should.be.an('array')

        result.body.length.should.equal(0)

        done()
      })
    })
  });

});
