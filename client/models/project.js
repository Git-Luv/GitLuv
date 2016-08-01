import fetch from 'isomorphic-fetch';
import * as profile from './profile'

var dc = require('delightful-cookies')

export function getRepoData(repoName) {
	profile.getUserData(dc.get('AuthToken'))
	.then(response => {
		fetch('https://api.github.com/repos/' + response.login + '/' + repoName,
		{
			headers: {
			Authorization: "token " + authToken,
			Accept: 'application/json'
			}
		})
		.then(response => {
			return response.json();
		})
	})
}