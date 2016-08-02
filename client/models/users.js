import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function getAllUsers(){
	return fetch('/api/usersGET', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function getUser(username){
	return fetch('/api/users/' + username, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function addUser(userObj){
	return fetch('/api/usersPOST', {
		method: 'POST',
		headers: {
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
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([username, updatedAttrs])
	})
	.then(x => console.log("Patched!"))
	.catch(err => console.error(err))
}