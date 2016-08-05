var Project = module.exports;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', function() {
	console.log("project running!!!")
});

var projectSchema = new Schema({
	title:          String,
	username:       String,
	repo_url:       String,
	description:    String,
	location:       String,
	looking_for:    String,
	req_skills:     Array,
	users_liked:    Array,
	users_disliked: Array,
})

var ProjectCollection = mongoose.model('ProjectCollection', projectSchema)


Project.createIfNotExists = function(attrs){

	let title = attrs.title
	delete attrs.title

	return ProjectCollection.findOneAndUpdate({title: title}, attrs, {upsert: true}, function (err, doc) {
		if(err){
			console.log("!!!-----------------!!!", err)
		} else {
			console.log("created!")
		}
	})
}

Project.all = function(){

	return ProjectCollection.find(function (err, projects) {
		if(err) console.log("!!!-----------------!!!", err)		 
	})
}

Project.getProject = function(projectTitle){

	return ProjectCollection.findOne({title: projectTitle}, function (err, projects) {
		if(err) console.log("!!!-----------------!!!", err)		 
	})
}

Project.editProject = function(title, changedAttrs){
	console.log("title: " + title + " and changedAttrs: " + changedAttrs)

	return Project.getProject(title)
		.then(function (projectInfo){

		console.log("running?")

			if(changedAttrs.req_skills){
				let newArr = []
				for(let i = 0; i < changedAttrs.req_skills.length; i++){

					if(!(projectInfo.req_skills.indexOf(changedAttrs.req_skills[i]) >= 0)){
						newArr.push(changedAttrs.req_skills[i])
					}
				}
				changedAttrs.req_skills = projectInfo.req_skills.concat(newArr)
			}

			if(changedAttrs.users_liked){
				let newArr2 = []
				for(let i = 0; i < changedAttrs.users_liked.length; i++){

					if(!(projectInfo.users_liked.indexOf(changedAttrs.users_liked[i]) >= 0)){
						newArr2.push(changedAttrs.users_liked[i])
					}
				}
				changedAttrs.users_liked = projectInfo.users_liked.concat(newArr2)
			}

			if(changedAttrs.users_disliked){
				let newArr3 = []
				for(let i = 0; i < changedAttrs.users_disliked.length; i++){

					if(!(projectInfo.users_disliked.indexOf(changedAttrs.users_disliked[i]) >= 0)){
						newArr3.push(changedAttrs.users_disliked[i])
					}
				}
				changedAttrs.users_disliked = projectInfo.users_disliked.concat(newArr3)
			}

			return ProjectCollection.findOneAndUpdate({title: title}, changedAttrs, function (err, doc) {
				if(err){
					console.log("!!!-----------------!!!", err)
				} else {
					console.log("created!")
				}
			})
	})
	.catch(err => console.log("what? ", err))
}