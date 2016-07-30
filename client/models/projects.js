import fetch from 'isomorphic-fetch';

export function getAllProjects(){
	return fetch('/api/projects', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data)
	.catch(err => console.error(err))
}

export function getProject(title){
	return fetch('/api/projects/' + title, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}})
	.then(data => data.json())
	.catch(err => console.error(err))
}

export function addProject(projectObj){
	return fetch('/api/projects', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(projectObj)
	})
	.then(x => console.log("Added!"))
	.catch(err => console.error(err))
}

export function addProject(title, updatedAttrs){
	return fetch('/api/projects', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify([title, updatedAttrs])
	})
	.then(x => console.log("Patched!"))
	.catch(err => console.error(err))
}