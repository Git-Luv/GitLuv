import fetch from 'isomorphic-fetch';

export function getUserData(authToken) {
	return fetch('https://api.github.com/user', {
		method: 'GET',
		headers: {
			Authorization: "token " + authToken,
			Accept: 'application/json'
		}
	})
	.then(response => {
		return response.json();
	})
}