import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import Sidebar from './sidebar';
import Badge from './badge';

import * as model from '../models/profile';
import * as Users from '../models/users';
import * as Projects from '../models/projects';

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
			model.getUserData(dc.get('AuthToken'))
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

	getBadges() {
		// get all badges, check to see what badge's the user has and return an array of badges to be rendered
		// Props for badges:
		// badgeID
		// Title,
		// Description,
		// Rules { amount: 5, object: 'project', operator: '>' }

		// Badges will be stored in database
		// Store amount (5), object ('project') and operator (>)
		// Every action we need to check if the user has completed any badges and award/notify the user
		Projects.getAllUserProjects(this.state.userInfo.login)
		.then(projects => {
			console.log('projects', projects)
		})
	}

  render() {
  	this.getBadges();
	  return (
	  	<div>
    	<Sidebar />
	    <div className="profile" >
	    	<div onClick={this.changeSidebarState.bind(this, false)}>
		    	<table>
			    	<tr>
				    	<th className="profile-leftPanel">
					     	<div>
					     		<img src={this.state.userInfo.avatar_url} />
				     		</div>
			     		</th>
			     		<th className="profile-middlePanel">
			     			<div>
			     				<Badge />
			     			</div>
			     		</th>
				     	<th className="profile-rightPanel">
				     		<h1>{this.state.userInfo.login}</h1>
				     		<div className="profile-location">{this.state.userInfo.location}</div>
				     		<div className="profile-followers">Followers: {this.state.userInfo.followers}</div>
				     		<p className="profile-bio">{this.state.userInfo.bio}</p>
				     		<p>
					     		<a target="_blank" href={'http://www.github.com/' + this.state.userInfo.login} className="toGithub">
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
		     			return(<button className="pure-button skill animated fadeInUp" key={i}>
								{skill}
							</button>)
		     		})}
		     	</div>
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
