import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
var dc = require('delightful-cookies');

//function that will return all chatrooms
export function getAllChatrooms(){
	return fetch('/api/chatGET', {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

//function that will return a chatroom by specific name
//.catch() returns a rejected promise to trigger .catch() in calling function
export function getChatroom(chatRoom){
	console.log("chatroom?", chatRoom)
	return fetch('/api/chat/' + chatRoom, {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => new Promise(function(res, rej){return rej()}))
}

//function that adds a chatroom, and will update one if it already exists
export function addChatroom(chatRoomObj){
	return fetch('/api/chatPOST', {
		method: 'POST',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(chatRoomObj)
	})
	.then(x => console.log("Added!"))
	.catch(err => console.error(err))
}

//function that updates a chatroom
export function updateChatroom(chatRoom, updatedAttrs){
	return fetch('/api/chatPATCH', {
		method: 'PATCH',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([chatRoom, updatedAttrs])
	})
	.then(x => console.log("Patched!"))
	.catch(err => console.error(err))
}