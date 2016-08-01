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
		console.log("stateALL", this.state)
	}

		

	handleClick(skill) {
		// this.setState({liked: !this.setState.liked});
			let userSkills = this.state.userSkills;
			let allSkills = this.state.allSkills 
			console.log("allSkills", allSkills)

					userSkills.push(skill);

			console.log("userSkills", userSkills)
			console.log("I WAS CLICKED ON", skill + "   I am typeOf ", typeof skill)
	}	

	sendToDatabase(skillz) {
		let userSkills = this.state.userSkills;
		console.log("USERSKILLS OK BYE", userSkills)
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
	     		<div >
   				 		<button className="button-skillsSelected" onClick={this.sendToDatabase.bind(this, skillz)}>Show Me Some Projects!</button>
   					</div>
	    </div>
		);
	}
};


	// render() {
	// 	const text=this.state.liked ? 'liked' : 'haven\'t liked';

	// 	return (

	// 		<div onClick = {this.handleClick}>
	// 			You {text} this.
	// 			</div>

	// render() {
	// 	const text=this.state.liked ? 'liked' : 'haven\'t liked';

	// 	return (

	// 		<div onClick = {this.handleClick}>
	// 			You {text} this.
	// 			</div>


	// 	);
	// }

	// 	);
	// }

