var Badge = module.exports;
var mongoose = require('../db');
mongoose.promise = global.Promise;

var badgeSchema = new mongoose.Schema({
	badgeid: Number,
	title: String,
	description: String,
	rules: Object
})

var BadgeCollection = mongoose.model('badgeCollection', badgeSchema);

Badge.getAll = function() {
	return BadgeCollection.find({}, (err, data) => {
		if(err){
			console.log("Error:", err)
		}
		console.log("UGH DATA:", data)
	})
}

Badge.create = function(body) {
	var badge = new BadgeCollection(body)

	badge.save((err, idk) => {
		if(err){
			console.log('ERROR!', err)
		}
	})

	// return BadgeCollection.findOneAndUpdate({badgeid: badgeid}, body, {upsert: true}, function (err, doc) {
	// 	if(err){
	// 		console.log("!!!-----------------!!!", err)
	// 	} else {
	// 		console.log("created!")
	// 	}
	// })
}

Badge.addBadge = function(username, badgeid) {
	
}