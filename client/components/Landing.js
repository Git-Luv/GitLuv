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
  		mode: 'no-cors'
  	})
  	.then(res => {
  		// Redirect to github auth page
  		document.location.href = res.url;
  	})
  }

  render() {
	  return (
	    <div className="landingPage">
	    	<h1>GitLuv</h1>
	    	<button type="button" className="pure-button" onClick={this.login}>Login with Github</button>
	    </div>
	  )
	}
}
