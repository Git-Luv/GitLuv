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

export function createRepo(repoObject){
	return profile.getUserData(dc.get('AuthToken').value)
	.then(response => {
		return fetch('https://api.github.com/' + response.login + '/repos',
		{
			method:'POST',
			headers: {
			Authorization: "token " + dc.get('AuthToken').value,
			Accept: 'application/json'
			},
			body: JSON.stringify(repoObject)
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