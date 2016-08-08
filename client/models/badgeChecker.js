import * as Users from './users'
import * as Projects from './projects'
import fetch from 'isomorphic-fetch';

export function checkProjects(username) {
	Promise.all([
		Users.getUser(username), 
		Projects.getAllUserProjects(username), 
	])
	.then(data => {
		let user = data[0],
				projects = data[1];
				
		console.log(user, projects);

		fetch('/api/badges')
		.then(res => {
			console.log(res);
		})
	})
}