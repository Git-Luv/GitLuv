import React from 'react';
import { browserHistory, Link } from 'react-router';

import * as model from '../models/swipe'

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			projectInfo: {
				title: null,
				description: null,
				lookingFor: null,
				skills: null,
			}
		}
	}
 
  render() {
	  return (
     	<div>
     		<h1>{this.state.projectInfo.title}</h1>
     		<div>{this.state.projectInfo.description}</div>
     		<p>{this.state.projectInfo.lookingFor}</p>
     		<p>{this.state.projectInfo.skills}</p>
     	</div>
	  )
	}
}
