import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import Sidebar from './sidebar'

import * as model from '../models/profile';
import * as Users from '../models/users';

var dc = require('delightful-cookies');

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
			userSkills: [],
			isSidebar: false,
		}
	}

	componentWillMount() {
		if(dc.get('AuthToken')){
			// Take all browser's cookies and find the one we need
			model.getUserData(dc.get('AuthToken').value)
			.then(res => {
				Users.getUser(res.login)
				.then(user => {
					this.setState({userInfo: res, userSkills: user.skills})
				})
			})
		} else {
			browserHistory.pushState(null, '/');
		}
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
		    	<button className="sidebarButton pure-button" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
		    	<table>
			    	<tr>
				    	<th className="profile-leftPanel">
					     	<div>
					     		<img src={this.state.userInfo.avatar_url} />
				     		</div>
			     		</th>
				     	<th className="profile-rightPanel">
				     		<h1>{this.state.userInfo.login}</h1>
				     		<div className="profile-location">{this.state.userInfo.location}</div>
				     		<div className="profile-followers">Followers: {this.state.userInfo.followers}</div>
				     		<p className="profile-bio">{this.state.userInfo.bio}</p>
				     		<p>
					     		<a href={'http://www.github.com/' + this.state.userInfo.login} className="toGithub">
					     			<img src="/images/github.jpeg"/>
					     		</a>
				     		</p>
			     		</th>
		     		</tr>
	     		</table>
	     		<div className="badges">
	     			BADGES
	     		</div>
		     	<div className="skills">
		     	<span>Skills:</span>
		     		{this.state.userSkills.map((skill, i) => {
		     			return(<div className="skill animated fadeInUp" key={i}>
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
