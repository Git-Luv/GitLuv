import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as model from '../models/project';
import * as Projects from '../models/projects'

var skills = [
"JavaScript", "React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router", "C++", "Java", "Ruby", "Python", "Go", "Haskell", "Android", "iOS", "C#", "Machine Language(s)", "Ruby on Rails", "MEAN stack", "PERRN stack", "Heroku"]

var errorTimeoutId;

export default class CreateProject extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stage: 0,
			input0: "",
			inputArea: "",
			project: {},
			error: false,
		}
	}

	handleChange(event) {
		this.setState({ input0: event.target.value })
	}

	handleAreaChange(event) {
		this.setState({ inputArea: event.target.value })
	}

	handleNextStage(command) {
		switch(this.state.stage){
			case 0:
				model.getRepoData(this.state.input0)
				.then(repo => {
					this.setState({ project: {
						title: 					repo.name,
						description: 		repo.description,
						username:       repo.owner.login,
						looking_for:  	this.state.inputArea,
						repo_url:       repo.html_url,
						description:    repo.description,
						location:       null,
						req_skills:     [],
						users_liked:    [],
						users_disliked: [],
					}, stage: 1 })
				})
				.catch(err => {
					if(errorTimeoutId){
						window.clearTimeout(errorTimeoutId);
					}
					if(!document.getElementsByClassName('projectWarning')[0])
						document.getElementsByClassName('projectWarning-hidden')[0].className = "projectWarning animated tada"
					else {
						document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated fadeOut"
						window.setTimeout(x => {document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated tada"}, 200)		
					}

					errorTimeoutId = window.setTimeout(x => {
						document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated fadeOut";
					}, 4000)
				})
		}
	}

	handleSkillSelect(skill) {
		var temp = this.state.project;
		var index = temp.req_skills.indexOf(skill);
		if(index > -1){
			temp.req_skills.splice(index, 1)
		} else {
			temp.req_skills.push(skill);	
		}

		this.setState({ project: temp })
	}

	submitProject() {

		if(this.state.project.req_skills.length > 0){
			Projects.addProject(this.state.project)
			.then(res => {
				this.props.project.setState({ isCreatingProject: false, error: false });
				window.alert("Project created!")
			})
		} else {
			if(errorTimeoutId){
				window.clearTimeout(errorTimeoutId);
			}
			if(!document.getElementsByClassName('projectWarning')[0])
				document.getElementsByClassName('projectWarning-hidden')[0].className = "projectWarning animated tada"
			else {
				document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated fadeOut"
				window.setTimeout(x => {document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated tada"}, 200)		
			}

			errorTimeoutId = window.setTimeout(x => {
				document.getElementsByClassName('projectWarning')[0].className = "projectWarning animated fadeOut";
			}, 4000)
		}
	}

	cancelProject() {
		this.props.project.setState({ isCreatingProject: false })
	}

	returnStage(stage) {
		switch(stage){
			case 0:
				return (
					<div className="stage">
						<button type="button" className="projectCancelButton" onClick={this.cancelProject.bind(this)}>X</button>
						GitHub Repo name: <input onChange={this.handleChange.bind(this)} />
						<span>What kind of work are you looking for?</span>
						<textarea rows="4" cols="50" onChange={this.handleAreaChange.bind(this)} />
						<button type="button" className="button-like pure-button" onClick={this.handleNextStage.bind(this, 'next')}>Next</button>
						<div className="projectWarning-hidden animated tada">You don't have a repo on your GitHub account with that name</div>
					</div>
					)
			case 1:
				return (
					<div>
						<h1 style={{paddingTop: '10px'}}>{this.state.project.title}</h1>
						<div>Description: <span>{this.state.project.description}</span></div>
						<div>Please select the skills you require for this project</div>
						<div className="skillSelector">
							{skills.map((skill, i) => {
								var skillClassName = '';
								if(this.state.project.req_skills.indexOf(skill) > -1) 
									skillClassName = "skill-selected" 
								else
									skillClassName = "skill-deselected"
								return (
									<button key={i} className={skillClassName + " animated flipInX"} onClick={this.handleSkillSelect.bind(this, skill)}>
										{skill}
									</button> )
							})}
						</div>
						<button className="pure-button createProjectSubmit" onClick={this.submitProject.bind(this)}>Submit</button>
						<div className="projectWarning-hidden animated tada">Please choose at least one skill</div>
					</div>
				)
			case 2:
				return (
					<div>ENDING!</div>
				)
		}
	}

	render() {
		return (
			<div className="createProjectModal">
				<div className="modalContent animated fadeInUp">
					<div className="stageContent animated fadeInRight" >
						{ this.returnStage(this.state.stage) }
					</div>
				</div>
			</div>
			)
	}

}