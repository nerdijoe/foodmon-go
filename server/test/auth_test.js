var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../server');
var User = require('../models/users');
let passwordHash = require('password-hash');

/*
name : {
  type: String,
  required: true
},
email : {
  type: String,
  required: true,
  unique: true
},
username : {
  type: String,
  required: true,
  unique: true
},
password : {
  type: String,
  required: true,
  unique: true
},
interestArr: [{
  type: Schema.Types.ObjectId,
  ref: 'Interest'

*/

describe('Auth', () => {

  beforeEach( (done) => {
    var newUser = User({
      name: "rudy",
      email: "rudy@haha.com",
      username: "rudy",
      password: "sha1$6f85ce31$1$7936552d15684ac319e4d222a99f1ab871174db0",
      interestArr: []
    })

    newUser.save( (err, user) => {
      newUser_id = user._id;
      done()
    })
  });

  afterEach( done => {
    User.remove({}, err => {
      done();
    })
  });

  it('POST - /auth/signup - should create a new user', (done) => {
    chai.request(server)
    .post('/auth/signup')
    .send({
      name: "ijo",
      email: "ijo@haha.com",
      username: "ijo",
      password: "haha"
    })
    .end( (err, result) => {
      // console.log("***** signup", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('name')
      result.body.should.have.property('email')
      result.body.should.have.property('username')
      result.body.should.have.property('password')

      result.body.name.should.equal('ijo')
      result.body.email.should.equal('ijo@haha.com')
      result.body.username.should.equal('ijo')
      passwordHash.verify("haha", result.body.password).should.equal(true)
      result.body.interestArr.should.be.an('array')

      done()
    })
  });

  it('POST - /auth/signin - correct credential should let the user sign in', (done) => {
    chai.request(server)
    .post('/auth/signin')
    .send({
      username: "rudy",
      password: "haha"
    })
    .end( (err, result) => {
      // console.log("***** signin", result)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('token')
      result.body.should.have.property('username')
      result.body.username.should.equal('rudy')
      done()
    })
  })
});
