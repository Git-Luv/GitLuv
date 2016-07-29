var Project = module.exports
var mongoose = require('mongoose');
mongoose.Promise = global.Promise
var Schema = mongoose.Schema;
mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

var conn = mongoose.connection;             
conn.on('error', console.error.bind(console, 'connection error:'));  

conn.once('open', function() {
	console.log("running!!!")
});

var projectSchema = new Schema({
	title:          String,
	repo_url:       String,
	description:    String,
	location:       String,
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
		console.log("saving!!!")
		if(err) console.log("!!!-----------------!!!", err)		 
	})

}