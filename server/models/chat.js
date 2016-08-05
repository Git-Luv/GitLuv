var Chat = module.exports;
var mongoose = require('../db');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://gitluv:lolboi5@ds031965.mlab.com:31965/gitluv');

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error in chat:'));

conn.once('open', function() {
	console.log("chat running!!!")
})

var chatSchema = new Schema({
	chatRoom:  String,
	visionary: String,
	developer: String,
	messages:  Array,
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

Chat.getChatroom = function(chatRoom){

	return ChatCollection.findOne({chatRoom: chatRoom}, function (err, doc) {
		if(err) console.log("!!!-----------------!!!", err)
	})
}

Chat.updateChatroom = function(chatRoom, changedAttrs){
	console.log("chat room: " + chatRoom + " and changedAttrs: " + changedAttrs)

	return Chat.getChatroom(chatRoom)
		.then( function (chatRoomInfo){
		
			if(changedAttrs.messages){
				let newArr = []
				for(let i = 0; i < changedAttrs.messages.length; i++){

					if(!(chatRoomInfo.messages.indexOf(changedAttrs.messages[i]) >= 0)){
						newArr.push(changedAttrs.messages[i])
					}
				}
				changedAttrs.messages = chatRoomInfo.messages.concat(newArr)
			}

			// if(changedAttrs.messagesFromDeveloper){
			// 	let newArr1 = []
			// 	for(let i = 0; i < changedAttrs.messagesFromDeveloper.length; i++){

			// 		if(!(chatRoomInfo.messagesFromDeveloper.indexOf(changedAttrs.messagesFromDeveloper[i]) >= 0)){
			// 			newArr1.push(changedAttrs.messagesFromDeveloper[i])
			// 		}
			// 	}
			// 	changedAttrs.messagesFromDeveloper = chatRoomInfo.messagesFromDeveloper.concat(newArr1)
			// }

			return ChatCollection.findOneAndUpdate({chatRoom: chatRoom}, changedAttrs, function (err, doc) {
				if(err){
					console.log("!!!-----------------!!!", err)
				} else {
					console.log("update chat room:", chatRoom, "!")
				}
			})
		})
		.catch(err => console.log("error in chat model: ", err))

}