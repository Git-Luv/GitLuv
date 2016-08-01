import React from 'react'
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';


export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			allSkills: ["React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo"],
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
		updateUser(user, skillz)
		//add redirect to projects page

	}

	render() {
		let skillz = this.state.userSkills;
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
