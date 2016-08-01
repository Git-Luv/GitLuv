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
		// console.log("stateALL", this.state)
	}

// on click push skill into empty 'skills' array
		// but first check if it's there, like with index of and -1
// then have 2nd function that pushes that array of user 'skills' to the databse when they click the done/next butotn on the bottom of the page

//then 
		

	handleClick(skill) {
		this.setState({liked: !this.setState.liked});
			let userSkills = this.state.userSkills;
			let allSkills = this.state.allSkills 
			console.log("allSkills", allSkills)
			userSkills.push(skill)
			console.log("userSkills", userSkills)
			console.log("I WAS CLICKED ON", skill + "   I am typeOf ", typeof skill)
	}
		// console.log('You clicked: ', i)
	

	sendToDatabase(i) {

		console.log("HIIIIII", i.key)
	}

	render() {
		const text=this.state.liked ? 'liked' : 'haven\'t liked';

		return (
			<div>
	     	<div className="skills">
	     	<span>Skills:</span>
	     		{this.state.allSkills.map((skill, i) => {
	     			// console.log("skills", skill.name)
	     			return(<div className="skill" key={i} onClick={this.handleClick.bind(this, skill)}>
							{skill}
						</div>)
	     		})}
	     	</div>
	     		<div >
   				 		<button className="button-skillsSelected" onClick={this.sendToDatabase}>Show Me Some Projects!</button>
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

