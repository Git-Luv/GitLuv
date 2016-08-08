import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar'
import CreateProject from './createproject'
import * as Projects from '../models/projects'
import * as modelProfile from '../models/profile';

import { Accordion, AccordionItem } from 'react-sanfona';
import { CardStack, Card } from 'react-cardstack';

// require('normalize.css');
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
		this.toggleAccordion = this.toggleAccordion.bind(this)
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

	var acc = document.getElementsByClassName("accordion");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].onclick = function(){
	        this.classList.toggle("active");
	        this.nextElementSibling.classList.toggle("show");
		}	
	}
// preexisting to addition of users who like functionality
	if(!dc.get('AuthToken')){
		browserHistory.pushState(null, '/')
	}

	document.getElementsByClassName('accordion').onclick = function() {

    var className = ' ' + accordion.className + ' ';

    if ( ~className.indexOf(' active ') ) {
        this.className = className.replace(' active ', ' ');
        console.log('NOT ACTIVE')
    } else {
        this.className += ' active';
        console.log('ACTIVE')
    }              
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

	toggleAccordion(e) {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
		        console.log('panel?', this.nextElementSibling.classList)
		        console.log('CLASS', this.classList)
    		}	
		}
	}





//// render render render render render render ////
//////////////////////////////////////////////////
	render() {
		var active
		return (
			<div>
				<div>
					<Sidebar />
					<h2 className="projectsPageTitle">My Projects</h2>
					<div className="projectsLiked">
						<h4 className="usersWhoLikedTitle">These Developers Like Your Project(s)!</h4>
						<div className="likedUsers">
			                {this.state.myProjects.map((item, i) => {
			                    return (
			                    	<div className="accordionContainer" key={i}>
				                        <button className="accordion" title={`${ item.title}`}  onClick={this.toggleAccordion} key={i} >{item.title}</button>
				                            <div className="panel">
				                            	<CardStack 
				                            		width={480}
												    height={100}
												    background='#f8f8f8'
												    hoverOffset={25}>

												    <Card background='#464ef7'>
												    	<div className='card'>
												        	<h3>kyhant</h3>
											        	</div>
												    </Card>

												    <Card background='#5f66f8'>
												    	<div className='card'>
												        	<h3>mccarthyist</h3>
											        	</div>
												    </Card>

												</CardStack>
				                            </div>
			                        </div>
			                    );
			                })}
			            </div>
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