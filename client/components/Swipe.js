import React from 'react';
import { browserHistory, Link } from 'react-router';

import * as model from '../models/swipe'

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: {
				username: null,
				location: null,
				bio: null,
				avatar: null,
			}
		}
	}

	componentWillMount() {
		console.log(document.cookie)
		model.getUserData(document.cookie.split('=')[1])
		.then(res => {
			console.log("Hello!", res, this)
			this.setState({userInfo: {
				username: res.login,
				location: res.location,
				bio: res.bio,
				avatar: res.avatar_url
			}})
		})
	}

  render() {
	  return (
	    <div>
	     	Welcome to GITLUV!
	     	<div>
	     		<img src={this.state.userInfo.avatar} />
	     		<h1>{this.state.userInfo.username}</h1>
	     		<div>{this.state.userInfo.location}</div>
	     		<p>{this.state.userInfo.bio}</p>
	     	</div>
	    </div>
	  )
	}
}
