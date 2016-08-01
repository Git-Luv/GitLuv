import React from 'react'
import { Router, Route, browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';


export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			allSkills: ["React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router"],
			userSkills: []
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(skill) {
			let userSkills = this.state.userSkills;
			console.log("skill", skill)
			if(userSkills.indexOf(skill) == -1) {
				console.log("hi from inside this loop", userSkills.indexOf(skill))
				userSkills.push(skill)
			};
			console.log("userSkills", userSkills)
			console.log("I WAS CLICKED ON", skill)
	}	

	sendToDatabase(user, skillz) {
		let userSkills = this.state.userSkills;
		console.log("USERSKILLS OK BYE", userSkills)
		//call method to update user in DB with new selection of selected skills
		// updateUser(user, skillz)
		//add redirect to projects page
		browserHistory.pushState(null, '/swipe')
	}

	render() {
		let skillz = this.state.userSkills;
		//add a whole bunch of styling to make all this furr awesome
		return (
			<div>
	     	<div className="skills">
	     	<span>Skills:</span>
	     		{this.state.allSkills.map((skill, i) => {
	     			return(<div className="skill" key={i} onClick={this.handleClick.bind(this, skill)}>
							{skill}
						</div>)
	     		})}
	     	</div>
	     		<div className="button-skillsSelected">
   				 		<button onClick={this.sendToDatabase.bind(this, skillz)}>Show Me Some Projects!</button>
   					</div>
	    </div>
		);
	}
};
