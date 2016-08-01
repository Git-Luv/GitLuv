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
	projects:     Array,
	updated_at:   String
})

var UserCollection = mongoose.model('UserCollection', userSchema)


User.createIfNotExists = function(attrs){

	let usrnm = attrs.username
	delete attrs.username

	return UserCollection.findOneAndUpdate({username: usrnm}, attrs, {upsert: true}, function (err, doc) {
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

User.editUser = function(username, changedAttrs){
	console.log("username: " + username + " and changedAttrs: " + changedAttrs)

	return User.getUser(username)
	.then(function (userInfo){

		console.log("running?")

		if(changedAttrs.skills){
			let newArr = []
			for(let i = 0; i < changedAttrs.skills.length; i++){

				if(!(userInfo.skills.indexOf(changedAttrs.skills[i]) >= 0)){
					newArr.push(changedAttrs.skills[i])
				}
			}
			changedAttrs.skills = userInfo.skills.concat(newArr)
		}

		if(changedAttrs.projects){
			let newArr2 = []
			for(let i = 0; i < changedAttrs.projects.length; i++){

				if(!(userInfo.projects.indexOf(changedAttrs.projects[i]) >= 0)){
					newArr2.push(changedAttrs.projects[i])
				}
			}
			changedAttrs.projects = userInfo.projects.concat(newArr2)
		}

		return UserCollection.findOneAndUpdate({username: username}, changedAttrs, function (err, doc) {
			if(err){
				console.log("!!!-----------------!!!", err)
			} else {
				console.log("created!")
			}
		})


	})
	.catch(err => console.log("what? ", err))
}