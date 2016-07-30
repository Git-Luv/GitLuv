import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import Sidebar from './sidebar'

import * as model from '../models/profile';



export default class Profile extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			userInfo: {
				username: null,
				location: null,
				bio: null,
				avatar: null,
			},
			userSkills: ["React", "Node", "Express", "Git", "authom", "Socket.io", "Mongo", "Redux", "React-Router"],
			isSidebar: false,
		}
	}

	componentWillMount() {
		// Take all browser's cookies and find the one we need
		let cookie = this.getCookie();
		model.getUserData(cookie.value)
		.then(res => {
			this.setState({userInfo: res});
		})
	}

	getCookie() {
		// Splits cookie string into individual cookie strings in an array
		let cookies = document.cookie.split(';');
		// Takes the cookies array and creates an object for each cookie.
		cookies.forEach((cookie, i) => {
			let cookieArray = cookie.split('=')
			cookies[i] = {
				name: cookieArray[0],
				value: cookieArray[1],
			}
		})
		// Finds the "AuthToken" cookie and returns it
		let result;
		cookies.forEach(cookie => {
			if(cookie.name === 'AuthToken'){
				result = cookie;
			}
		})
		return result;
	}

	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

  render() {

	  return (
	    <div className="profile" >
	    	<Sidebar state={this.state.isSidebar}/>
	    	<div onClick={this.changeSidebarState.bind(this, false)}>
		    	<button className="sidebarButton" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
		     	<div>
		     		<img src={this.state.userInfo.avatar_url} />
		     		<h1>{this.state.userInfo.login}</h1>
		     		<div>{this.state.userInfo.location}</div>
		     		<div>Followers: {this.state.userInfo.followers}</div>
		     		<p>{this.state.userInfo.bio}</p>
		     	</div>
		     	<div className="skills">
		     	<span>Skills:</span>
		     		{this.state.userSkills.map((skill, i) => {
		     			return(<div className="skill" key={i}>
								{skill}
							</div>)
		     		})}
		     	</div>
	     	</div>
	    </div>
	  )
	}
}

// export default class Skill extends React.Component {
// 	constructor(props){
// 		super(props);
// 	}

// 	render() {
// 		return (
// 			<div className="skill">
// 				{this.props.skillName}
// 			</div>
// 			)
// 	}
// }
