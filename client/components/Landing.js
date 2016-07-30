import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';

export default class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

  login(e) {
  	e.preventDefault()
  	
  	fetch('https://github.com/login/oauth/authorize?client_id=444a46dcbe1340ce4a49&redirect_uri=http://localhost:4000/auth/login', {
  		method: "GET",
  		redirect: "manual",
  		mode: 'no-cors',
  	})
  	.then(res => {
  		// Redirect to github auth page
  		document.location.href = res.url;
  	})
  }

  render() {
	  return (
	    <div className="landingPage">
	    	<h1 className="welcomeh1">Welcome to</h1>
	    	<h1 className="gitluvh1">GitLuv</h1>
	    	<div className="description">We connect visionaries and developers to bring dreams into reality</div>
	    	<input type="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRce09JcurXChhgGjKhLTTvOcQ8glqfIdFQclOWdQdY92eJ2uYg7w" onClick={this.login} />
	    </div>
	  )
	}
}
