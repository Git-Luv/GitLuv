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

Notify.add = function(obj) {
	var item = new Collection(obj)
	item.created = new Date();
	if(!obj){
		item.isRead = false;
	} else {
		item.isRead = obj.isRead;
	}

	item.save(err => {
		if(err)
			console.log("ERROR notifications.js:21", err)
	})
}

Notify.remove = function(obj) {
	Collection.find({ _id: obj.id }).remove().exec();
}

Notify.getOne = function(id) {
	return Collection.find({ _id: id })
}

Notify.get = function(username) {
	return Collection.find({ username: username })
}

Notify.getUnread = function(username) {
	return Collection.find({ username: username }).where('isRead').equals(false)
}
