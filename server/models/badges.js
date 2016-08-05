var Badge = module.exports;
var mongoose = require('mongoose');
mongoose.promise = global.Promise;
mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

var badgeSchema = new mongoose.Schema({
	badgeid: Number,
	title: String,
	description: String,
	rules: Object
})

var BadgeCollection = mongoose.model('BadgeCollection', badgeSchema);

