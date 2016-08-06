var Session = module.exports;
var mongoose = require('../db');
mongoose.promise = global.Promise;

var sessionSchema = new mongoose.Schema({
	username: String,
	authToken: String
})

var SessionCollection = mongoose.model('SessionCollection', sessionSchema);

Session.create = function(username, token) {
	let session = new SessionCollection({
		username: username,
		authToken: token
	})

	session.save(function (err, data) {
		if(err)	console.log("!!!-----------------!!!", err);
		else console.log('session saved', data)
	})
}

Session.remove = function(authToken) {
	SessionCollection.find({authToken: authToken}).remove((err, data) => {
		if(err) console.log('ERROR:', err);
	})
}