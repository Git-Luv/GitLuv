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

	// let changedAttrs = JSON.parse(changedAttrsJSON)
	console.log("!!!" + changedAttrs)
	return User.getUser(username)
	.then(function (userInfo){

		console.log("running?")

		if(changedAttrs.skills !== userInfo.skills){
			changedAttrs.skills = userInfo.skills.concat(changedAttrs.skills)
			console.log("New Skills: ", changedAttrs.skills)
		} else {
			delete changedAttrs.skills
		}

		if(changedAttrs.projects !== userInfo.projects){
			changedAttrs.projects = userInfo.projects.concat(changedAttrs.projects)
			console.log("New Projects: ", changedAttrs.projects)
		} else {
			delete changedAttrs.projects
		}

		// changedAttrs.skills   = newSkills
		// changedAttrs.projects = newProjects

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