import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
var dc = require('delightful-cookies');

export function getAllUsers(){
	return fetch('/api/usersGET', {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function getUser(username){
	return fetch('/api/users/' + username, {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function addUser(userObj){
	return fetch('/api/usersPOST', {
		method: 'POST',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(userObj)
	})
	.then(x => console.log("Added!"))
	.catch(err => console.error(err))
}

export function updateUser(username, updatedAttrs){
	return fetch('/api/usersPATCH', {
		method: 'PATCH',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([username, updatedAttrs])
	})
	.then(x => console.log("Patched in DB!", x))
	.catch(err => console.error(err))
}