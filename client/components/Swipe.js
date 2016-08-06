import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar';
import * as Projects from '../models/projects'
import * as model from '../models/profile';
import * as Users from '../models/users'
import * as Utils from '../utils'

import { fetchProjects } from '../models/swipe'
var dc = require('delightful-cookies');
var hasEvent = false;

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isSidebar: false,
			projects: null,
			username: null,
			direction: 'null',
			likedProjects: [],
			userSkills: []
		}
		this.handleLike = this.handleLike.bind(this);
		this.handleDislike = this.handleDislike.bind(this);
		this.updateArray = this.updateArray.bind(this);
	}

	componentDidMount() {

		hasEvent = false;

		if(dc.get('AuthToken')){
			// Take all browser's cookies and find the one we need
			model.getUserData(dc.get('AuthToken'))
			.then(res => {
				// console.log('res', res)
				this.setState({username: res.login});

				// grab all projects from db
		 		Projects.getAllProjects()
		 		.then(x => {
		 			var allProjects = [];
		 			x.forEach((project) => {
		 				if (project.users_liked.indexOf(res.login) === -1 && project.users_disliked.indexOf(res.login) === -1) {
		 					allProjects.push(project)
		 				}
		 			})
		 			// grab user info including user skills
		 			Users.getUser(res.login)
		 			.then(res => {
		 				//add user skills to this.state.userSkills
		 				this.setState({userSkills: res.skills})
						allProjects.forEach(project => {
			 				project.commonSkills = Utils.getCommonSkillCount(res, project);
		 				})
		 				// Sort based on the amount of commonSkills
		 				allProjects = allProjects.sort((a, b) => {
		 					if(a.commonSkills < b.commonSkills){
		 						return 1;
		 					} else if(a.commonSkills > b.commonSkills){
		 						return -1;
		 					} else {
		 						return 0;
		 					}
		 				})
		 				this.setState({projects: allProjects})
		 			})
		 		})
			})
		} else {
			browserHistory.pushState(null, '/');
		}
 		// Projects.getAllProjects().then(x => console.log(x))
 		// Projects.addProject({title: "wtf", users_liked: ['mccarthyist']})
 		// Projects.updateProject("wtf", {description: "uhh"})
 		// Projects.getProject("wtf").then(y => console.log(y))


 		// Users.getAllUsers().then(z => console.log(z))
 		// Users.addUser({username: "Mr. Junior", location: "hell", followers: 6})
 		// Users.updateUser("Mr. Junior", {bio: "lol"})
 		// Users.getUser("Mr. Junior").then(a => console.log(a))
 		
 	}

 	handleLike(event) {
 		event.preventDefault();
 		Projects.updateProject(this.state.projects[0].title, {users_liked: [this.state.username]})
 		this.setState({ direction: 'right' })
 		if(!hasEvent) {
 			document.getElementsByClassName('currentProject')[0].addEventListener('animationend', this.updateArray.bind(this))
 			hasEvent = true;
 		}
 	}
 	handleDislike(event) {
 		event.preventDefault();
 		Projects.updateProject(this.state.projects[0].title, {users_disliked: [this.state.username]})
		this.setState({ direction: 'left'})
		if(!hasEvent) {
			document.getElementsByClassName('currentProject')[0].addEventListener('animationend', this.updateArray.bind(this))
			hasEvent = true;
		}
	}

	handleProjects(skill){
		if(this.state.userSkills.indexOf(skill) >= 0){
			return true;
		}
		else{
			return false;
		}
	}

		
    updateArray() { 
 			var updatedProjects = this.state.projects.slice(1)
			this.setState({
				projects: updatedProjects,
				direction: 'null' 
			})
		}

 	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

    render() {
	  	var direction = this.state.direction === 'left' ? 'animated bounceOutLeft' : this.state.direction === 'right' ? 'animated bounceOutRight' : 'null'
	  	// console.log('state', this.state)

	  	if(this.state.projects === null) {
	  		return (<h3 className="loading">Loading...</h3>)
	  	} else if (this.state.projects.length === 0) {
	  		return (
	  			<div>
		  			<Sidebar />
		  			<h3 className="loading">No more projects, check back later!</h3>
	  			</div>
	  			)
	  	} else {
			  return (
			  	<div>
		  			<Sidebar />
			  		<div className='swipe'>
		     				<div key={this.state.projects[0].id} className={'currentProject ' + direction} onClick={this.changeSidebarState.bind(this, false)}>
					     		<span className="project"><h1>{this.state.projects[0].title}</h1></span>
					     		<div className="description">
					     			<h2>Project Description:</h2>
					     			<p>{this.state.projects[0].description}</p>
					     			<h2>Looking For:</h2>
						     		<p>{this.state.projects[0].looking_for}</p>
						     		<h2>Required Skills:</h2>
						     		<p>{this.state.projects[0].req_skills.map(skill => <div className={this.handleProjects(skill)? 'skill-selected': 'skill-deselected'}>{skill}</div>)}</p>
					     		</div>
			     			</div>
			     		<div className="buttons">
					     	<button type="button" className="button-dislike pure-button" onClick={this.handleDislike.bind(this)}>Dislike</button>
					     	<button type="button" className="button-like pure-button" onClick={this.handleLike}>Like</button>
			   			</div>
		     		</div>
	  			</div>
		    )
    	}			
	}
}
