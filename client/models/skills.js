import fetch from 'isomorphic-fetch';

export function storeUserSkills (user, selectedSkills) {
	return fetch('/api/users', {
		method: 'PATCH', 
		headers: {
			'Content-Type': 'application/json'
		}
		body:
		{
			'user': 'selectedSkills'
		}
	})
	.then(users => return response.json());
	.catch(error => console.error(error));
}