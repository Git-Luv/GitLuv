import fetch from 'isomorphic-fetch';

export function storeUserSkills (user, userSkills) {
	return fetch('/api/users', {
		method: 'PATCH', 
		headers: {
			'Content-Type': 'application/json'
		},
		body: ""
			// JSON.stringify(	[user, {skills: userSkills}])
		
	})
	.then(response => console.log("wtfwtftf", response))
	.catch(error => console.error(error))
}