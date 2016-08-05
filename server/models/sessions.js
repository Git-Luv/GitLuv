var Session = module.exports;
var mongoose = require('../db');
mongoose.promise = global.Promise;

var sessionSchema = new mongoose.Schema({
	username: String,
	authToken: Number
})

var SessionCollection = mongoose.model('SessionCollection', badgeSchema);

Session.create = function(username, token) {
	return SessionCollection.findOneAndUpdate({authToken: token}, {authToken: token, username: username}, {upset: true}, function (err, doc) {
		if(err){
			console.log("!!!-----------------!!!", err)
		}
	})
}