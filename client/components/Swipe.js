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
				},
				{ id: 3,
					title: 'the lost world',
					description: 'building a digital terrarium to bring dinosaurs out of extinction',
					lookingFor: 'time traveler to collect dna samples, with javascript',
					skills: 'minimum 5 years working in the jurassic period'
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
 		var updatedProjects = this.state.projects.slice(1)
		this.setState({ projects: updatedProjects })
 	}


  render() {
	  return (
	  	<div className='swipe'>
     			<div key={this.state.projects[0].id} className='currentProject'>
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
			     	<button type="button" className="button-dislike pure-button" onClick={this.handleDislike}>Dislike</button>
			     	<button type="button" className="button-like pure-button" onSubmit={this.onSubmit}>Like</button>
						<Link className="button-profile pure-button" to={`profile`}>Profile</Link>
	   			</div>
     	</div>
	  )
	}
}
