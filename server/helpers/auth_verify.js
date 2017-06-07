const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  auth: function(req, res, next) {
    jwt.verify(req.headers.token, process.env.SECRET_KEY, function(err, decoded) {
      if (decoded) {
				req.decoded = decoded;
        next()
      } else {
        res.send('You must login!')
      }
    })
  }
}
