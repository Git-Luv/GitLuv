var Session = module.exports;
var mongoose = require('../db');
mongoose.promise = global.Promise;

var badgeSchema = new mongoose.Schema({
	badgeid: Number,
	title: String,
	description: String,
	rules: Object
})

var BadgeCollection = mongoose.model('BadgeCollection', badgeSchema);

