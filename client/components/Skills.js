import React from 'react'
import { Router, Route, browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as modelSkills from '../models/users';
import * as modelProfile from '../models/profile';
let dc = require('delightful-cookies')

export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		// add languages as desired
		this.state = {
			allSkills: ["React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router", "C++", "Java", "Ruby", "Python", "Go", "Haskell"],
			userSkills: [],
			user: ""
		};
		this.handleClick = this.handleClick.bind(this);
	};

	componentWillMount() {
		let cookie = dc.get("AuthToken")
		modelProfile.getUserData(cookie.value)
		.then(res => {
			this.setState({user: res.login});
			let user = this.state.user;
		})
	};

	handleClick(skill) {
			let userSkills = this.state.userSkills;
			if(userSkills.indexOf(skill) == -1) {
				userSkills.push(skill)
			};
	};

	sendToDatabase(user, skillz) {
		let userSkillz = {skills: this.state.userSkills};
		let userName = this.state.user;
		modelSkills.updateUser(userName, userSkillz);
		browserHistory.pushState(null, '/swipe');

	};

	render() {
		let skillz = this.state.userSkills;
		//add a whole bunch of styling to make all this furr awesome
		return (
			<div>
				<h2 className="animated zoomOutUp" >This is a Test</h2>
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
	};
};
