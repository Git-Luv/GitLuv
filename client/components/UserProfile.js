import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import Sidebar from './sidebar'

import * as model from '../models/profile';
import * as Users from '../models/users';

var dc = require('delightful-cookies');

export default class UserProfile extends React.Component {

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
		var url = window.location.href;
		var user = url.slice(url.lastIndexOf('/')+1, url.length);

		Users.getUser(user)
		.then(user => {
			this.setState({userInfo: user, userSkills: user.skills})
		})
	}

	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

  render() {
  	console.log('STATE', this.state)
	  return (
	  	<div>
	    	<Sidebar />
		    <div className="profile" >
		    	<div onClick={this.changeSidebarState.bind(this, false)}>
			     	<div>
			     		<img src={this.state.userInfo.avatar_url} />
		     		</div>
		     		<div className="profile-right">
			     		<h1>{this.state.userInfo.username}</h1>
			     		<div>{this.state.userInfo.location}</div>
			     		<div>Followers: {this.state.userInfo.followers}</div>
			     		<p>{this.state.userInfo.bio}</p>
			     		<p>
				     		<a target="_blank" href={'http://www.github.com/' + this.state.userInfo.username} className="toGithub">
				     			<img src="/images/github.jpeg"/>
				     		</a>
			     		</p>
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
	    </div>
	  )
	}
}