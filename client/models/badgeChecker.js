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
			console.log("RES", res);
			return res.json()
		})
		.then(badges => {
			badges = badges
			.filter(badge => { badge.rules.object === 'project' && user.badges.indexOf(badge.badgeid) === -1 ? true : false })
			.forEach(badge => {
				if(eval(`${projects.length} ${badge.rules.operator} ${badge.rules.amount}`)){
					
				}
			})
			console.log("DATA", badges)
		})
	})
}