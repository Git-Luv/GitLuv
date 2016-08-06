import React from 'react';
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as Chat from '../models/chat'
import Sidebar from './sidebar'

var dc = require('delightful-cookies');

export default class Landing extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
	}

	componentWillMount() {
		// Chat.addChatroom({chatRoom: "mccarthyistthetslc", visionary: "thetslc", developer: "mccarthyist"})
		// Chat.getChatroom("mccarthyistthetslc").then(x => console.log(x))
		// Chat.updateChatroom("mccarthyistthetslc", {messages:[{sentBy: 'mccarthyist', message: 'eyo' }, {sentBy: 'thetslc', message: 'watup' }]})
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
	  	<div>
	  		<div className="custom-wrapper pure-g " ref="menuClass" id="menu">
			    <div className="pure-u-1 pure-u-md-1-4">
			        <div className="pure-menu">
			            <a href="#" className="pure-menu-heading custom-brand menu-item l-box">GitLuv</a>
			            <a href="#" className="custom-toggle" ref="toggleClass" id="toggle" onClick={this.toggleMenu}><s className="bar"></s><s className="bar"></s></a>
			        </div>
			    </div>
			    
			</div>
	    <div className="landingPage">
	    	<div className="landing-text">
	    	<h1 className="gitluvh1">GitLuv</h1>
	    	<div className="description">Bring your product to life</div>
	    	<input type="image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRce09JcurXChhgGjKhLTTvOcQ8glqfIdFQclOWdQdY92eJ2uYg7w" onClick={this.login} />
	    	</div>
  	  	</div>
	    </div>
	  )
	}
}
