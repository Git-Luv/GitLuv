import fetch from 'isomorphic-fetch';

// {
// 		description: 	String,
// 		isRead: 			Boolean,
// 		username:  		String, 
// }
export function add(obj){
	return fetch('/api/notifications', {
		method: "POST",
		body: obj,
	}).then(res => {
		return res.json();
	})
}

// { id: }
export function remove(obj) {
	return fetch('/api/notifications', {
		method: "DELETE",
		body: obj,
	}).then(res => {
		return res.json();
	})
}

export function get(username) {
	return fetch('/api/notifications/' + username)
	.then(res => {
		return res.json();
	})
}

export function getUnread(username) {
	return fetch('/api/unreadNotifications/' + username)
	.then(res => {
		return res.json();
	})
}