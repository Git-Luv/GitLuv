import React from 'react'
import { Router, Route, browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as modelSkills from '../models/users';
import * as modelProfile from '../models/profile';
let dc = require('delightful-cookies')
let Popout = require('react-popout')

export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		// add languages as desired
		this.state = {
			allSkills: ["React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router", "C++", "Java", "Ruby", "Python", "Go", "Haskell", "Android", "iOS", "C#", "Machine Language(s)", "Ruby on Rails", "MEAN stack", "PERRN stack", "Heroku"],
			userSkills: [],
			user: "",
			// isPoppedOut: false
		};
		// this.popoutClosed = this.popoutClosed.bind(this)
		// this.popout = this.popout.bind(this);
		this.handleClick = this.handleClick.bind(this);
	};

	popout() {
	  this.setState({isPoppedOut: true});
	}

	popoutClosed() {
	  this.setState({isPoppedOut: false});
	}

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
			let index = userSkills.indexOf(skill)
			if(index > -1) {
				userSkills.splice(index, 1) 
			} else {
				userSkills.push(skill)
			}
			this.setState({userSkills: userSkills})
			console.log(userSkills)
	};

	sendToDatabase(user, skillz) {
		let Popout = this.state.isPoppedOut
		let userSkillz = {skills: this.state.userSkills};
		let userName = this.state.user;
		if (userSkillz.skills.length < 1 || !userSkillz) {
			alert("Please choose at least one skill")
			this.setState({isPoppedOut: true})
			console.log("LESS THAN 1")
		} else {
		modelSkills.updateUser(userName, userSkillz);
		browserHistory.pushState(null, '/swipe');
		console.log("ThIS IS DB STUFF", userName, userSkillz) }
	};

	render() {
		let skillz = this.state.userSkills;

		// if (this.state.isPoppedOut) {
		//       return (
		//         <Popout  title='Window title' onClosing={this.popoutClosed}>
		//           <div>Popped out content!</div>
		//         </Popout>
		//       );
		//     } 

		return (
			<div>
				<h2 className = "skillPageTitle"> Choose Your Top Skills </h2>
	     	<div className="skillSelector">
	     		{this.state.allSkills.map((skill, i) => {var skillClassName = '';
								if(this.state.userSkills.indexOf(skill) > -1) 
									skillClassName = "skill-selected" 
								else
									skillClassName = "skill-deselected"
	     			return(
	     				<button key={i} className={skillClassName + " animated flipInX"} onClick={this.handleClick.bind(this, skill)}>
	     					{skill}
	     				</button> )
	     		})}
	     	</div>
	     		<div className="button-skillsSelected">
   				 		<button onClick={this.sendToDatabase.bind(this, skillz)}>Show Me Some Projects!</button>
   					</div>
	    </div>
		);
	};
};
