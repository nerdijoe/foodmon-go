let express = require('express');
let bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
let jwt = require('jsonwebtoken');
let passwordHash = require('password-hash');
let cors = require('cors');
let app = express();
require('dotenv').config();

// mongoose setup *************************
//connect to mongoDB DB
var mongoose = require('mongoose');

var db_config = {
  production: 'mongodb://edim:edimdendy@foodmoncluster-shard-00-00-eawpb.mongodb.net:27017,foodmoncluster-shard-00-01-eawpb.mongodb.net:27017,foodmoncluster-shard-00-02-eawpb.mongodb.net:27017/foodmon_db?ssl=true&replicaSet=foodmonCluster-shard-0&authSource=admin',
  development: 'mongodb://edim:edimdendy@foodmoncluster-shard-00-00-eawpb.mongodb.net:27017,foodmoncluster-shard-00-01-eawpb.mongodb.net:27017,foodmoncluster-shard-00-02-eawpb.mongodb.net:27017/foodmon_db?ssl=true&replicaSet=foodmonCluster-shard-0&authSource=admin',
  test: 'mongodb://localhost/foodmon_dev_test'
}

var app_env = app.settings.env
mongoose.connect(db_config[app_env], (err,res) => {
  console.log('Connected to Database: ' + db_config[app_env] );
});
// mongoose setup end *************************

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use('/auth', require('./routes/auth'));
app.use('/interest', require('./routes/interest'));
app.use('/users', require('./routes/users'));

app.use(passport.initialize());

passport.use(new Strategy(function(username, password, cb) {
  let User = require('./models/users')
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) cb(err)
    if (passwordHash.verify(password, user.password)) {
      cb(null, user)
    } else {
      cb('Password is not correct !')
    }
  })
}));

app.listen(3000, function () {
  console.log('Server is listening on port 3000!')
})

module.exports = app;
