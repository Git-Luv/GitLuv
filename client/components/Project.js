import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar'
import CreateProject from './createproject'
import * as Projects from '../models/projects'

var dc = require('delightful-cookies');

export default class Project extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSidebar: false,
			project: null,
			isCreatingProject: null,
			// added to state to show users who liked your projects
			myProjects: [],
			allprojects: []
		}
	}


//// users who liked your projects functionality ////
/////////////////////////////////////////////////////










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

	componentWillMount() {
		if(!dc.get('AuthToken')){
			browserHistory.pushState(null, '/')
		}
	}



//// render render render render render render ////
//////////////////////////////////////////////////
	render() {
		console.log(this.state.isCreatingProject)

		return (
			<div>
				<div>
					<h2 className="usersWhoLikedTitle">These Users Like Your Project!</h2>


					
				</div>
	







					<div className="projectPage">
						<Sidebar state={this.state.isSidebar} />
						{ this.state.isCreatingProject ? <CreateProject project={this} /> : null }
						<div onClick={this.changeSidebarState.bind(this, false)}>
							<button className="sidebarButton pure-button" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
							{ this.state.project ? 
								<div>HELLO WORLD!</div> 
								:
							  <button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
							}
					</div>
				</div>
			</div>
			)
	}

}