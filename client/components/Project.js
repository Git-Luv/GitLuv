import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar'
import CreateProject from './createproject'
import * as Projects from '../models/projects'
import * as modelProfile from '../models/profile';

import { Accordion, AccordionItem } from 'react-sanfona';

var dc = require('delightful-cookies');

export default class Project extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isSidebar: false,
			project: null,
			isCreatingProject: null,
			myProjects: [],
			user: ""
		}
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
		console.log("user", user)
		let creator = this.state.user
		Projects.getAllProjects()
		.then(projects => {
			console.log("PROJECTS imported as", projects)
			var temp = [];
			projects.forEach((project) => {
				console.log("creator", this.state.user)
				console.log("projects.username", project.username )
				if (project.username == creator) {
					console.log("wtf this happened")
					temp.push(project);
				}
			})
			this.setState({myProjects: temp})
		})

	})




// preexisting to addition of users who like functionality
	if(!dc.get('AuthToken')){
		browserHistory.pushState(null, '/')
	}
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




//// render render render render render render ////
//////////////////////////////////////////////////
	render() {
		console.log(this.state.isCreatingProject)
		console.log("MY PROJECTS", this.state.myProjects)
		return (
			<div>
				<div>
					<Sidebar />
					<h2 className="projectsPageTitle">My Projects</h2>
					<div className="projectsLiked">
						<h4 className="usersWhoLikedTitle">These Developers Like Your Project(s)!</h4>
						<Accordion className="likedUsers">
			                {this.state.myProjects.map((item, i) => {
			                    return (
			                    	<div className="demo-container">
				                        <AccordionItem title={`${ item.title}`}  key={i} >
				                            <div>
				                                {`Liked by: ${ item.users_liked.map(user =>  user ).join(', ') }`}
				                            </div>
				                        </AccordionItem>
			                        </div>
			                    );
			                })}
			            </Accordion>
		            </div>
				</div>
						<div className="projectPage">
							{ this.state.isCreatingProject ? <CreateProject project={this} /> : null }							
							<button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
						</div>
			</div>

			)
	}

}