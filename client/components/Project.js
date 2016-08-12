import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar'
import CreateProject from './createproject'
import * as Projects from '../models/projects'
import * as modelProfile from '../models/profile';
import * as modelUser from '../models/users';
import ChatBox from './ChatBox'


import { Accordion, AccordionItem } from 'react-sanfona';
import { CardStack, Card } from 'react-cardstack';

// require('normalize.css');
var dc = require('delightful-cookies');

export default class Project extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSidebar: false,
			project: null,
			isCreatingProject: null,
			myProjects: [],
			allUsers:[],
			user: ""
		}
		this.toggleAccordion = this.toggleAccordion.bind(this)
		this.getUserData = this.getUserData.bind(this)
	}


//// users who liked your projects functionality ////
/////////////////////////////////////////////////////


componentWillMount() {
	// identifies username
	let cookie = dc.get("AuthToken")
	modelProfile.getUserData(cookie.value)
	.then(res => {
		this.setState({user: res.login});
		let user = this.state.user;
		let creator = this.state.user
		Projects.getAllProjects()
		.then(projects => {
			var temp = [];
			projects.forEach((project) => {
				if (project.username == creator) {
					temp.push(project);
				}
			})
			this.setState({myProjects: temp})
		})
	})

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        this.nextElementSibling.classList.toggle("show");
		}	
	}
// preexisting to addition of users who like functionality
	if(!dc.get('AuthToken')){
		browserHistory.pushState(null, '/')
	}

	document.getElementsByClassName('accordion').onclick = function() {

	    var className = ' ' + accordion.className + ' ';

	    if ( ~className.indexOf(' active ') ) {
	        this.className = className.replace(' active ', ' ');
	    } else {
	        this.className += ' active';
	    }              
	}

	modelUser.getAllUsers()
	.then(res => {
		this.setState({allUsers: res})
	})
}







//// sidebar and create project functionality ////
//////////////////////////////////////////////////
	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

	createProject() {
		this.setState({ isCreatingProject: true })
	}

	toggleAccordion(e) {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
    		}	
		}
	}
	
	getUserData(user) {
		return modelUser.getUser(user)
		.then(res => {
			return res.avatar_url
		})
	}

	getAvatar(user) {
		var userObject = this.state.allUsers.filter(function(profile) {
			return profile.username === user;
		})
		return userObject[0].avatar_url
	}



//// render render render render render render ////
//////////////////////////////////////////////////
	render() {
		var active
		if(!this.state.myProjects.length) {
			return (
				<div>
					<Sidebar />
					<div className="projectPage"> 
						{ this.state.isCreatingProject ? <CreateProject project={this} /> : null }							
						<button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
					</div>
				</div>
				)
		} else {
		return (
			<div>
				<div>
					<Sidebar />
					<h2 className="projectsPageTitle">My Projects</h2>
					<div className="projectsLiked">
						<div className="likedUsers">
			                {this.state.myProjects.map((item, i) => {
			                    return (
			                    	<div className="accordionContainer" key={i}>
				                        <button className="accordion" title={`${ item.title}`}  onClick={this.toggleAccordion} key={i} >{item.title}</button>
				                            <div className="panel">
											    {item.users_liked.map(user => {
											    	return (
											    		<div className="user-liked">
											    		<Link to={`userprofile/${user}`}>
			     											<img className="userPhoto" src={this.getAvatar(user)} />
					                            			<span className="user-liked-username"><h4>{user}</h4></span>
				                            			</Link>
					                            			<Link to={`messages`}><button className="chat-button pure-button">chat</button></Link>
				                            			</div>
			                        				)
		                        				})}
				                            </div>
			                        </div>
			                    );
			                })}
			            </div>
		            </div>
				</div>
					<div className="projectPage"> 
						{ this.state.isCreatingProject ? <CreateProject project={this} /> : null }							
						<button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
					</div>
			</div>

			)
		// }
	}

}
}


