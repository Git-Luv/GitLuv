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
	})

	Projects.getAllProjects()
	.then(projects => {
		console.log("PROJECTS imported as", projects)
		projects.forEach((project) => {
			if (project.username == user) {
				console.log("wtf this happened")
			}
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

		return (
			<div>
				<div>
					<h2 className="usersWhoLikedTitle">These Users Like Your Project!</h2>
					<Accordion>
					                {[1, 2, 3, 4, 5].map((item) => {
					                    return (
					                        <AccordionItem title={`Item ${ item }`} slug={item} key={item}>
					                            <div>
					                                {`Item ${ item } content`}
					                                {item === 3 ? <p><img src="https://cloud.githubusercontent.com/assets/38787/8015584/2883817e-0bda-11e5-9662-b7daf40e8c27.gif" /></p> : null}
					                            </div>
					                        </AccordionItem>
					                    );
					                })}
					            </Accordion>


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