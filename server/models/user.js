var User = module.exports
var mongoose = require('../db');
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;

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
	followers:    Number,
	skills:       Array,
	visionary:    Boolean,
	projects:     Array,
	endorsements: Array,
	updated_at:   String
})

var UserCollection = mongoose.model('UserCollection', userSchema)

//function that creates a user, will update if it already exists
User.createIfNotExists = function(attrs){

	let usrnm = attrs.username
	delete attrs.username

	return UserCollection.findOneAndUpdate({username: usrnm}, attrs, {upsert: true}, function (err, doc) {
		if(err){
			console.log("!!!-----------------!!!", err)
		} 
	})
}

//function that gets all users
User.all = function(){

	return UserCollection.find(function (err, users) {
		if(err) console.log("!!!-----------------!!!", err)	 
	})
}

//function that gets a user by username
User.getUser = function(username){

	return UserCollection.findOne({username: username}, function (err, projects) {
		if(err) console.log("!!!-----------------!!!", err)		 
	})
}

//function that edits a user.  Since parts of the collection are stored
//in an array, the User is first gotten from the database and the arrays 
//are then concatenated
User.editUser = function(username, changedAttrs){

	return User.getUser(username)
	.then(function (userInfo){

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
			} 
		})
	})
	.catch(err => console.log("User.editUser error: ", err))
}