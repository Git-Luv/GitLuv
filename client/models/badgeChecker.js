import * as Users from './users'
import * as Projects from './projects'
import fetch from 'isomorphic-fetch';

export function checkProjects(username) {
	
	fetch('/api/badges')
	.then(res => {
		Promise.all([
			Users.getUser(username), 
			Projects.getAllUserProjects(username),
			res.json()])
		.then(data => {
			let user = data[0],
					projects = data[1],
					badges = data[2];

			console.log(user, projects, badges);

		})
	})
}