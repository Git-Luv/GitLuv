var Notifications = module.exports;
var mongoose = require('../db');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var conn = mongoose.connection;