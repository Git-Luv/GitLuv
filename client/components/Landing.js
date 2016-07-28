import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';

export default class Home extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

  login(e) {
  	e.preventDefault()
  	console.log("It's working!", e)
  	var user = {
  		username: document.getElementById("username").value,
  		password: document.getElementById("password").value
  	}
  	fetch('https://github.com/login/oauth/authorize?client_id=444a46dcbe1340ce4a49', {
  		method: "GET",
  		redirect: "manual"
  	})
  	.then(res => {
  		console.log(res);
  	})
  	console.log("User:", user);
  }

  render() {
	  return (
	    <div>
	     	<form onSubmit={this.login}>
	     		<span>Use your github login!</span>
	     		<label htmlFor="username">Username:</label>
	     		<input id="username" type="text" />
	     		<label htmlFor="password">Username:</label>
	     		<input id="password" type="password" />
	     		<input type="submit" value="Login" />
	     	</form>
	    </div>
	  )
	}
}
