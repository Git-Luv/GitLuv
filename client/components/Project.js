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
			// added to state to show users who liked your projects
			myProjects: [],
			allprojects: [],
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
				console.log("trying")
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
				<Sidebar />
				<div>
					<h2 className="projectsPageTitle">Welcome Visionary</h2>
					<img className="visionaryBadge" src="/images/badge.jpeg" />
					<h4 className="usersWhoLikedTitle">These Developers Like Your Project(s)!</h4>
					<Accordion>
					                {this.state.myProjects.map((item) => {
					                    return (
					                        <AccordionItem title={`Your Project: ${ item }`} slug={item} key={item}>
					                            <div>
					                                {`Item ${ item } content`}
					                                {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
					                            </div>
					                        </AccordionItem>
					                    );
					                })}
					            </Accordion>


				</div>
	








				<div className="projectPage" >
					{ this.state.isCreatingProject ? <CreateProject project={this} /> : null }
							
							
						  <button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
						}
					</div>
				</div>
			)
	}

}