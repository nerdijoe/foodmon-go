const mongoose = require('mongoose')
const Schema = mongoose.Schema

const interestSchema = new Schema({
  name : {
    type: String,
    required: true,
    unique: true
  }
})

const Interest = mongoose.model('Interest', interestSchema)
module.exports = Interest
