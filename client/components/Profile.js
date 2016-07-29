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
		model.getUserData(document.cookie.split('=')[1])
		.then(res => {
			this.setState({userInfo: res});
		})
	}

	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

  render() {

	  return (
	    <div className="profile" onClick={this.changeSidebarState.bind(this, false)}>
	    	<Sidebar state={this.state.isSidebar}/>
	    	<button onClick={this.changeSidebarState.bind(this, true)}>|||</button>
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
