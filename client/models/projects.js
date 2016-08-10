import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();
var dc = require('delightful-cookies');


export function getAllProjects(){
	return fetch('/api/projectsGET', {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(function(data){
		return data.json()
	})
	.catch(function(err){
	  return console.error(err)
	})
}

export function getProject(title){
	return fetch('/api/projects/' + title, {
		method: 'GET',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function addProject(projectObj){
	return fetch('/api/projectsPOST', {
		method: 'POST',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(projectObj)
	})
	.then(x => console.log("Added!"))
	.catch(err => console.error(err))
}

export function updateProject(title, updatedAttrs){
	return fetch('/api/projectsPATCH', {
		method: 'PATCH',
		headers: {
			'Authorization': dc.get('AuthToken').value,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([title, updatedAttrs])
	})
	.then(x => console.log("Patched!"))
	.catch(err => console.error(err))
}