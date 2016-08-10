var Notify = module.exports;
var mongoose = require('../db');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var conn = mongoose.connection;

var notificationSchema = new Schema({
	description: 	String,
	isRead: 			Boolean,
	username:  		String,
	created: 			String, 
})

var Collection = mongoose.model('Notifications', notificationSchema);

Notify.add = function(obj){
	var item = new Collection(obj)
	item.created = new Date();

	item.save(err => {
		if(err)
			console.log("ERROR notifications.js:21", err)
	})
}

Notify.remove = function(id){
	Collection.remove({ _id: id }, err => {
		if(err)
			console.log("ERROR notifications.js:29", err)
	})

}

Notify.get = function(username){
	return Collection.find({ username: username })
}

Notify.getUnread = function(username){
	return Collection.find({ username: username }).where('isRead').equals(false)
}