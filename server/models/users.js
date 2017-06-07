const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
  }]
})

const User = mongoose.model('User', userSchema)
module.exports = User
