const User = require('../models/users')
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const methods = {}

methods.signin = function(req, res){
  let user = req.user
	let username = req.user.username
  let token = jwt.sign({
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
    _id: req.user._id
  }, process.env.SECRET_KEY);
    res.send({token: token, username: username, _id: req.user._id })
}

methods.signup = function(req, res){
  let data = req.body
  data.password = passwordHash.generate(req.body.password)
  User.find({ username : req.body.username})
  .exec((error, records)=>{
    if(error){
      res.json({error})
    } else {
      let source = data
      if(records.length !== 0){
        res.json({ msg: 'username is exist' })
      }else{
        User.create(source, function(error, user){
          if(error){
            res.json({error})
          } else {
            res.json(user)
          }
        })
      }
    }
  })
}

module.exports = methods
