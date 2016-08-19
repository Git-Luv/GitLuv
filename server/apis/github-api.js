var fetch = require('isomorphic-fetch');
var Profile = module.exports

//function that gets user data from github based on a user's authToken
Profile.getUserData = function(authToken) {
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