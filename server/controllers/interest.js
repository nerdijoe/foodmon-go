const Interest = require('../models/interest')
const methods = {}

methods.insertOne = function(req, res){
  Interest.create({
    name : req.body.name
	}, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.getAll = function(req, res){
  Interest.find({}, function(error, records){
    if(error){
      res.json({error})
    } else {
      res.json(records)
    }
  })
}

methods.getById = function(req, res){
  Interest.find({_id : req.params.id })
	.exec((error, records) => {
    if(error){
      res.json({error})
    } else {
			res.json(records);
    }
  })
}

methods.updateById = function(req, res){
  Interest.findByIdAndUpdate(req.params.id,
		{ $set: {
			name : req.body.name
		}
		},
		{new: true})
  	.exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.deleteById = function(req, res){
  Interest.findByIdAndRemove(req.params.id)
  .exec((error, record) => {
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

module.exports = methods
