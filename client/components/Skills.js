import React from 'react'
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';


export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			userSkills: [{name:"React"}, {name:"Angular.js"}, {name:"Redux"}, {name:"Mithril"}, {name:"Backbone"}, {name:"Node.js"}, {name:"Express"}, {name: "Git"}, {name: "Passport"}, {name: "Socket.io"}, {name: "Mongo"}]
		};
		this.handleClick = this.handleClick.bind(this);
		// console.log("stateALL", this.state)
	}

// on click push skill into empty 'skills' array
		// but first check if it's there, like with index of and -1
// then have 2nd function that pushes that array of user 'skills' to the databse when they click the done/next butotn on the bottom of the page

//then 
		

	handleClick(i) {
				//redo on click set state to not be targeting key of state object that no longer exists but now the liekd property of the i key on userSkills aray
		this.setState({liked: !this.setState.liked});
		console.log("state", this.state)
		console.log("name", this.state.name)
		// console.log('You clicked: ', i)
	}


	render() {
		const text=this.state.liked ? 'liked' : 'haven\'t liked';

		return (
			<div>
	     	<div className="skills" onClick={this.handleClick}>
	     	<span>Skills:</span>
	     		{this.state.userSkills.map((skill, i) => {
	     			// console.log("skills", skill.name)
	     			return(<div className="skill" key={i}>
							{skill.name}
						</div>)
	     		})}
	     	</div>
	     		<div >
   				 		<button className="button-skillsSelected" >Show Me Some Projects!</button>
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


	// 	);
	// }

