import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar';
import * as Projects from '../models/projects'
<<<<<<< HEAD
import * as model from '../models/profile';
=======
import * as Users from '../models/users'

>>>>>>> master


import { fetchProjects } from '../models/swipe'
var dc = require('delightful-cookies');

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			isSidebar: false,
			projects: [
				{ id: 1,
					title: 'atlantis',
					description: 'building an underwater digital civilization',
					lookingFor: 'programmer who can hold their breath very long',
					skills: 'h20 tolerant'
				},
				{ id: 2,
					title: 'rocketman',
					description: 'creating a javascript spaceship to go populate mars',
					lookingFor: 'rocketman with backend savvy to store our digital supplies',
					skills: 'not prone to motion sickness'
				},
				{ id: 3,
					title: 'the lost world',
					description: 'building a digital terrarium to bring dinosaurs out of extinction',
					lookingFor: 'time traveler to collect dna samples, with javascript',
					skills: 'minimum 5 years working in the jurassic period'
				}
			],
			key: 0,
			username: 'kyhan',
			direction: 'null',
			likedProjects: []
		}
		this.handleLike = this.handleLike.bind(this);
		this.handleDislike = this.handleDislike.bind(this);
		this.updateArray = this.updateArray.bind(this);
	}

	componentDidMount() {

<<<<<<< HEAD
		if(dc.get('AuthToken')){
			// Take all browser's cookies and find the one we need
			model.getUserData(dc.get('AuthToken').value)
			.then(res => {
				this.setState({username: res.username});
				// grab all projects from db
		 		// Projects.getAllProjects()
		 		// .then(x => {
		 		// 	this.setState({projects: x})
		 		// })
			})
		} else {
			browserHistory.pushState(null, '/');
		}
=======
 		Projects.getAllProjects().then(x => console.log(x))
 		Projects.addProject({title: "wtf", users_liked: ['mccarthyist']})
 		Projects.updateProject("wtf", {description: "uhh"})
 		Projects.getProject("wtf").then(y => console.log(y))

 		Users.getAllUsers().then(z => console.log(z))
 		Users.addUser({username: "Mr. Junior", location: "hell", followers: 6})
 		Users.updateUser("Mr. Junior", {bio: "lol"})
 		Users.getUser("Mr. Junior").then(a => console.log(a))

>>>>>>> master
 	}

 	handleLike(event) {
 		event.preventDefault();
 		Projects.updateProject(this.state.projects[0].title, this.state.username)
 		this.setState({ direction: 'right' })
 		document.getElementsByClassName('currentProject')[0].addEventListener('animationend', this.updateArray.bind(this))
 	}
 	handleDislike(event) {
 		event.preventDefault();
		this.setState({ direction: 'left'})
		document.getElementsByClassName('currentProject')[0].addEventListener('animationend', this.updateArray.bind(this))
	}
		
  updateArray() { 
			console.log("INUPDATEARRAY", this.state.direction)
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

	handleDislikeClick(event){
		this.handleDislike(event)
	}

  render() {
  	var direction = this.state.direction === 'left' ? 'animated bounceOutLeft' : this.state.direction === 'right' ? 'animated bounceOutRight' : 'null'
  	// console.log('DIRECTION BEFORE RENDER', direction)
	  return (
	  	<div className='swipe'>
	  			<Sidebar state={this.state.isSidebar}/>
     				<button className="sidebarButton" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
     			<div key={this.state.key} className={'currentProject ' + direction} onClick={this.changeSidebarState.bind(this, false)}>
		     		<span className="project"><h1>{this.state.projects[0].title}</h1></span>
		     		<div className="description">
		     			<h2>Project Description:</h2>
		     			<p>{this.state.projects[0].description}</p>
		     			<h2>Looking For:</h2>
			     		<p>{this.state.projects[0].lookingFor}</p>
			     		<h2>Required Skills:</h2>
			     		<p>{this.state.projects[0].skills}</p>
		     		</div>
	     		</div>
	     		<div className="buttons">
			     	<button type="button" className="button-dislike pure-button" onClick={this.handleDislikeClick.bind(this)}>Dislike</button>
			     	<button type="button" className="button-like pure-button" onClick={this.handleLike}>Like</button>
	   			</div>
     	</div>
	  )
	}
}
