import fetch from 'isomorphic-fetch';
import * as profile from './profile'

var dc = require('delightful-cookies')

export function getRepoData(repoName) {
	return profile.getUserData(dc.get('AuthToken').value)
	.then(response => {
		console.log(repoName);
		return fetch('https://api.github.com/repos/' + response.login + '/' + repoName,
		{
			headers: {
			Authorization: "token " + dc.get('AuthToken').value,
			Accept: 'application/json'
			}
		})
		.then(response => {
			console.log(response)
			return response.json();
		})
		.catch(err => {
			console.log("ERROR:", err)
		})
	})
}