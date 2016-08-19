var Chat = module.exports;
var mongoose = require('../db');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error in chat:'));

conn.once('open', function() {
	console.log("chat running!!!")
})

var chatSchema = new Schema({
	chatRoom : String,
	visionary: String,
	developer: String,
	messages : Array,
	initiated: Boolean,
	time     : String
})

var ChatCollection = mongoose.model('Chatcollection', chatSchema)

//function that creates a new chatroom, updates if it exists.
Chat.createIfNotExists = function(attrs){

	let chatRoom = attrs.chatRoom
	delete attrs.chatRoom 

	return ChatCollection.findOneAndUpdate({chatRoom: chatRoom}, attrs, {upsert: true}, function (err, doc) {
		if(err){
			console.log("!!!-----------------!!!", err)
		} 
	})
}

//function that returns all chatrooms
Chat.all = function(){

	return ChatCollection.find(function (err, chats) {
		if(err) console.log("!!!------------!!!", err)
	})
}

//function that gets a chatroom by name
Chat.getChatroom = function(chatRoom){

	return ChatCollection.findOne({chatRoom: chatRoom}, function (err, doc) {
		if(err) console.log("!!!-----------------!!!", err)
	})
}

//function that adds a message to a chatroom.  Since parts of the collection are stored
//in an array, the chatroom is first gotten from the database and then the new
//message is then concatenated
Chat.updateChatroom = function(chatRoom, changedAttrs){
	
	return Chat.getChatroom(chatRoom)
		.then( function (chatRoomInfo){

			let cRoom = changedAttrs.room
			if(changedAttrs.messages[0].message){
				let newMess = changedAttrs.messages[0] 
				cRoom = newMess.room
				delete newMess.room
				changedAttrs.messages = chatRoomInfo.messages.concat([newMess])
			}

			return ChatCollection.findOneAndUpdate({chatRoom: cRoom}, changedAttrs, function (err, doc) {
				if(err){
					console.log("!!!-----------------!!!", err)
				} 
			})
		})
		.catch(err => console.log("Chat.updateChatroom error: ", err))
}