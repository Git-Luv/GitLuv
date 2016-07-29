import React from 'react';
import { browserHistory, Link } from 'react-router';

import { fetchProjects } from '../models/swipe'

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [
				{ title: 'atlantis',
					description: 'building an underwater digital civilization',
					lookingFor: 'programmer who can hold their breath very long',
					skills: 'h20 tolerant'
				}
			]
		}
	}
 
 // componentWillMount() {
 // 	fetchProjects()
 // 		.then((projectData) => {
 // 			this.setState({projects: projectData})
 // 		});
 //  }

  render() {
	  return (
	  	<div className='swipe'>
	     	<div>
		     	{ this.state.projects
		     		.map((project) => {
		     		return (
		     			<div className='currentProject'>
				     		<h1>{project.title}</h1>
				     		<div>{project.description}</div>
				     		<p>{project.lookingFor}</p>
				     		<p>{project.skills}</p>
			     		</div>
		     		)})
		      }
	     	</div>
     	</div>
	  )
	}
}
