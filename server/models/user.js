var User = module.exports
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;
mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', function() {
	console.log("running!!!")
});

var userSchema = new Schema({
	username:     String,
	avatar_url:   String,
	url:          String,
	location:     String,
	bio:          String,
	repos:        Array,
	followers:    Number,
	skills:       Array,
	visionary:    Boolean,
	updated_at:   String
})

var UserCollection = mongoose.model('UserCollection', userSchema)


User.createIfNotExists = function(attrs){

	let usrnm = attrs.username
	delete attrs.username

	return UserCollection.findOneAndUpdate({username: usrnm}, attrs, {upsert: true}, function (err, doc) {
		console.log("saving!!!")
		if(err){
			console.log("!!!-----------------!!!", err)
		} else {
			console.log("created!")
		}
	})
}

User.all = function(){

	return UserCollection.find(function (err, users) {
		if(err) console.log("!!!-----------------!!!", err)	 
	})
}

User.getUser = function(username){

	return UserCollection.findOne({username: username}, function (err, projects) {
		console.log("saving!!!")
		if(err) console.log("!!!-----------------!!!", err)		 
	})
}