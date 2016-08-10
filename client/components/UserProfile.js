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
			activeUser: '',
			userInfo: {
				username: null,
				location: null,
				bio: null,
				avatar: null,
				endorsements: []
			},
			userSkills: [],
			isSidebar: false,
		}
		this.handleEndorsement = this.handleEndorsement.bind(this);
	}

	componentWillMount() {
		var url = window.location.href;
		var user = url.slice(url.lastIndexOf('/')+1, url.length);
		var cookie = dc.get("AuthToken")

		model.getUserData(cookie.value)
		.then(res => this.setState({ activeUser: res.login }))

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

	handleEndorsement(e) {
		e.preventDefault();
		var temp = this.state.userInfo;
		var activeUser = this.state.activeUser;
		var user = this.state.userInfo.username;
		var endorsements = this.state.userInfo.endorsements;
		if(endorsements.indexOf(activeUser) === -1 && activeUser !== user) {
			endorsements.push(this.state.activeUser);
		}
		temp.endorsements = endorsements;
		this.setState({userInfo: temp})
		Users.updateUser(this.state.userInfo.username, {endorsements: endorsements})
		.then(x => console.log('state after update', this.state))
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
		     			<div>Endorsements: {this.state.userInfo.endorsements.length}</div>
			     		<p>{this.state.userInfo.bio}</p>
			     		<p>
				     		<a target="_blank" href={'http://www.github.com/' + this.state.userInfo.username} className="toGithub">
				     			<img src="/images/github.jpeg"/>
				     		</a>
			     		</p>
			     		<div className="endorsements">
			     		<p>
							<button className="pure-button" onClick={this.handleEndorsement}>Endorse</button>
						</p>
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
	    </div>
	  )
	}
}