const Interest = require('../models/interest')
const methods = {}

methods.insertOne = function(req, res){
  Interest.create({
    cuisine_name : req.body.cuisine_name,
    cuisine_id : req.body.cuisine_id,
	}, function(error, record){
    if(error){
      res.json({error})
    } else {
      res.json(record)
    }
  })
}

methods.insertBulk = function(req, res) {
  console.log("insertBulk", req.body)
  Interest.collection.insert(req.body, (err, docs) => {
    if(err){
      res.json({err})
    } else {
      res.json(docs)
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
  Interest.findOne({_id : req.params.id })
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
			cuisine_name : req.body.cuisine_name
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
