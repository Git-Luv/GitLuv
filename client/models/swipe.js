import fetch from 'isomorphic-fetch';

export function getProjectData() {
	return fetch('/api/projects', {
		method: 'GET',
		headers: {
			'Content-Type' : 'application/json'
		}
	})
	.then(projects => return response.json());
	.catch(error => console.error(error));
}