var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const should = chai.should();

var server = require('../server');
var User = require('../models/users');
let passwordHash = require('password-hash');

describe('User', () => {

  let token = ''
  let user_id = ''
  // password: "sha1$6f85ce31$1$7936552d15684ac319e4d222a99f1ab871174db0",
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
        done()
      })

    })
  });

  afterEach( done => {
    User.remove({}, err => {
      done();
    })
  });

  // need to sign in and get the token to access user API
  it('GET - /users - should return all users', (done) => {
    chai.request(server)
    .get('/users')
    .set('token', token)
    .end( (err, result) => {
      // console.log("*** get users", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('array')

      result.body[0].should.have.property('name')
      result.body[0].should.have.property('email')
      result.body[0].should.have.property('username')
      result.body[0].should.have.property('password')

      result.body[0].name.should.equal('rudy')
      result.body[0].email.should.equal('rudy@haha.com')
      result.body[0].username.should.equal('rudy')
      passwordHash.verify("haha", result.body[0].password).should.equal(true)
      result.body[0].interestArr.should.be.an('array')

      done()
    })
  });

  it('GET - /users/id - should return user with specific id', (done) => {
    chai.request(server)
    .get(`/users/${user_id}`)
    .set('token', token)
    .end( (err, result) => {
      // console.log("*** get users/id", result.body)

      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('name')
      result.body.should.have.property('email')
      result.body.should.have.property('username')
      result.body.should.have.property('password')

      result.body.name.should.equal('rudy')
      result.body.email.should.equal('rudy@haha.com')
      result.body.username.should.equal('rudy')
      passwordHash.verify("haha", result.body.password).should.equal(true)
      result.body.interestArr.should.be.an('array')

      done()
    })
  });

  it('PUT - /users/id - edit user must return user json with updated data', (done) => {
    let name = 'Curry'
    let email = 'curry@warriors.com'
    let username = 'curry'
    let password = 'deep3'
    let hashedpassword = passwordHash.generate(password)

    chai.request(server)
    .put(`/users/${user_id}`)
    .set('token', token)
    .send({
      name: name,
      email: email,
      username: username,
      password: hashedpassword
    })
    .end( (err, result) => {
      // console.log("*** edit user", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('name')
      result.body.should.have.property('email')
      result.body.should.have.property('username')
      result.body.should.have.property('password')

      result.body.name.should.equal(name)
      result.body.email.should.equal(email)
      result.body.username.should.equal(username)
      passwordHash.verify(password, result.body.password).should.equal(true)
      result.body.interestArr.should.be.an('array')

      done()
    })
  });

  it('DELETE - /users/id', (done) => {
    chai.request(server)
    .del(`/users/${user_id}`)
    .set('token', token)
    .end( (err, result) => {
      // console.log("*** del user", result.body)
      result.should.have.status(200)
      result.should.be.an('object')
      result.body.should.be.an('object')

      result.body.should.have.property('name')
      result.body.should.have.property('email')
      result.body.should.have.property('username')
      result.body.should.have.property('password')

      result.body.name.should.equal('rudy')
      result.body.email.should.equal('rudy@haha.com')
      result.body.username.should.equal('rudy')
      passwordHash.verify("haha", result.body.password).should.equal(true)
      result.body.interestArr.should.be.an('array')

      chai.request(server)
      .get(`/users`)
      .set('token', token)
      .end( (err, result) => {
        // console.log("*** check users array length", result.body);
        result.should.have.status(200)
        result.body.should.be.an('array')
        result.body.length.should.equal(0)
        done()
      })

    })

  });
});
