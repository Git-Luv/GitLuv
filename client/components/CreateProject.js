import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as model from '../models/project';
import * as Projects from '../models/projects';
import * as Utils from '../utils'

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
						<button type="button" className="projectCancelButton pure-button" onClick={this.cancelProject.bind(this)}>X</button>
							<form className="pure-form create-project">
							    <fieldset className="pure-group">
							        <input type="text" className="pure-input-1-2" onChange={this.handleChange.bind(this)} placeholder="Enter GitHub Repo Title" />
							        <textarea className="pure-input-1-2" onChange={this.handleAreaChange.bind(this)} placeholder="Description of work to be completed"></textarea>
							    </fieldset>
							    <button type="button" onClick={this.handleNextStage.bind(this, 'next')} className="pure-button pure-input-1-2 pure-button-primary project-next">Next</button>
						    </form>
						<div className="projectWarning-hidden animated tada">`You don't have a repo on your GitHub account with that name`</div>
					</div>
					)
			case 1:
				return (
					<div>
						<button type="button" className="projectCancelButton pure-button" onClick={this.cancelProject.bind(this)}>X</button>
						<h1 style={{paddingTop: '10px'}}>{this.state.project.title}</h1>
						<div>Description: <span>{this.state.project.description}</span></div>
						<div>Please select the skills you require for this project</div>
						<div className="skillSelector">
							{Utils.getSkills().map((skill, i) => {
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
						<button className="pure-button createProjectSubmit pure-button" onClick={this.submitProject.bind(this)}>Submit</button>
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
					<div className="stageContent animated fadeIn" >
						{ this.returnStage(this.state.stage) }
					</div>
				</div>
			</div>
			)
	}

}