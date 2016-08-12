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

Chat.createIfNotExists = function(attrs){

	let chatRoom = attrs.chatRoom
	delete attrs.chatRoom 

	return ChatCollection.findOneAndUpdate({chatRoom: chatRoom}, attrs, {upsert: true}, function (err, doc) {
		if(err){
			console.log("!!!-----------------!!!", err)
		} else {
			console.log("chat room created between " + attrs.visionary + " and " + attrs.developer)
		}
	})
}

Chat.all = function(){

	return ChatCollection.find(function (err, chats) {
		if(err) console.log("!!!------------!!!", err)
	})
}

Chat.getChatroom = function(chatRoom){

	return ChatCollection.findOne({chatRoom: chatRoom}, function (err, doc) {
		if(err) console.log("!!!-----------------!!!", err)
	})
}

Chat.updateChatroom = function(chatRoom, changedAttrs){

	console.log("Step 3a --- Chat.updateChatroom => chatroom: ", chatRoom, "and: ", changedAttrs)
	
	return Chat.getChatroom(chatRoom)
		.then( function (chatRoomInfo){
		
			console.log("chatRoomInfo: ", chatRoomInfo)
			console.log("Step 3b --- changedAttrs: ", changedAttrs)

			let cRoom = changedAttrs.room

			if(changedAttrs.messages[0].message){
				let newMess = changedAttrs.messages[0] 
				console.log(newMess)

				cRoom = newMess.room

				delete newMess.room

				console.log("is this it?: ", newMess)

				changedAttrs.messages = chatRoomInfo.messages.concat([newMess])

				console.log("Step 3c --- changedAttrs: ", changedAttrs)

			}

			return ChatCollection.findOneAndUpdate({chatRoom: cRoom}, changedAttrs, function (err, doc) {
				if(err){
					console.log("!!!-----------------!!!", err)
				} else {
					console.log("update chat room:", chatRoom, "!")
				}
			})
		})
		.catch(err => console.log("error in chat model: ", err))
}