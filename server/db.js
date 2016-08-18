//File in place to create one and only one connection to the database.

var mongoose = require('mongoose');
mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

module.exports = mongoose;