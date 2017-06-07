const User = require('../models/users')
const methods = {}

methods.getAll = function(req, res){
  User.find({}, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.getById = function(req, res){
  let user_id = req.decoded._id;
  User.findOne({_id : user_id })
	.populate('interestArr')
	.exec((error, records) => {
    if(error){
      res.json({error})
    } else {
			res.json(records);
    }
  })
}

methods.updateById = function(req, res){
  User.findByIdAndUpdate(req.params.id, { $set:req.body }, {new: true})
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  User.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
