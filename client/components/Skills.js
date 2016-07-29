import React from 'react'
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';


export default class SkillsList extends React.Component {
	constructor (props) {
		super (props);
		this.state = {
			liked: false,
			userSkills: ["React", "Node", "Express", "Git", "authom", "Socket.io", "Mongo", "Redux", "React-Router"]
		};
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick(i) {
		this.setState({liked: !this.setState.liked});
		console.log("state", this.state)
		console.log('You clicked: ', i)
	}

	render() {
		const text=this.state.liked ? 'liked' : 'haven\'t liked';

		return (
	     	<div className="skills" onClick={this.handleClick}>
	     	<span>Skills:</span>
	     		{this.state.userSkills.map((skill, i) => {
	     			return(<div className="skill" key={i}>
							{skill}
						</div>)
	     		})}
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

