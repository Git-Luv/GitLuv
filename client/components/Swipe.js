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
 		var updatedProjects = this.state.projects.slice(1)
 		console.log('updatedProjects var', updatedProjects)
		this.setState({ projects: updatedProjects })
		console.log('updated projects', this.state)
 	}


  render() {
	  return (
	  	<div className='swipe'>
	     	<div>
		     	{ this.state.projects
		     		.map((project) => {
		     		return (
		     			<div key={project.id} className='currentProject'>
				     		<span className="project"><h1>{project.title}</h1></span>
				     		<div className="description">
				     			<h2>Project Description:</h2>
				     			<p>{project.description}</p>
				     			<h2>Looking For:</h2>
					     		<p>{project.lookingFor}</p>
					     		<h2>Required Skills:</h2>
					     		<p>{project.skills}</p>
				     		</div>
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
