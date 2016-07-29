import React from 'react';
import { browserHistory, Link } from 'react-router';

import { fetchProjects } from '../models/swipe'

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
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
				}
			]
		}
		this.handleDislike = this.handleDislike.bind(this);
	}
 // componentWillMount() {
 // 	fetchProjects()
 // 		.then((projectData) => {
 // 			this.setState({projects: projectData})
 // 		});
 //  }

 	handleDislike(event) {
 		event.preventDefault();
 		console.log(event)
 		console.log('state', this.state.projects)
 		var updatedProjects = this.state.projects.slice().shift()
 		console.log('updatedProjects var', updatedProjects)
		this.setState({ projects: updatedProjects })
		console.log('updated projects', this.state.projects)
 	}


  render() {
	  return (
	  	<div className='swipe'>
	     	<div>
		     	{ this.state.projects
		     		.map((project) => {
		     		return (
		     			<div key = {project.id} className='currentProject'>
				     		<h1>{project.title}</h1>
				     		<div>{project.description}</div>
				     		<p>{project.lookingFor}</p>
				     		<p>{project.skills}</p>
			     		</div>
		     		)})
		      }
		     	<button type="button" onClick={this.handleDislike}>Dislike</button>
		     	<button type="button" onSubmit={this.onSubmit}>Like</button>
	     		<button type="button"><Link to={`profile`}>Profile</Link></button>
	     	</div>
     	</div>
	  )
	}
}
