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
			inputDesc: "",
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

	handleDescChange(event) {
		this.setState({inputDesc: event.target.value })
	}

	handleCreateRepo(){
		var repoObject = {
			name: this.state.input0,
  			description: this.state.inputDesc,
  			private: false,
  			has_issues: true,
  			has_wiki: true,
  			has_downloads: true
		}
		model.createRepo(repoObject)
		.then(repo => {
			this.setState({ project: {
				title: 			repo.name,
				description: 	repo.description,
				username:       repo.owner.login,
				looking_for:  	this.state.inputArea,
				repo_url:       repo.html_url,
				description:    repo.description,
				location:       null,
				req_skills:     [],
				users_liked:    [],
				users_disliked: [],
			}, stage: 2 })
		})
	}

	handleNextStage(command) {
		switch(this.state.stage){
			case 0:
				model.getRepoData(this.state.input0)
				.then(repo => {
					this.setState({ project: {
						title: 			repo.name,
						description: 	repo.description,
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
					this.handleCreateRepo();
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
			if(!document.getElementsByClassName('projectWarning')[0]){
				// console.log('working????????')
				document.getElementsByClassName('projectWarning-hidden')[0].className = "projectWarning animated tada"
				
			}
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
					</div>
					)
			case 1:
				return (
					<div>
						<button type="button" className="projectCancelButton pure-button" onClick={this.cancelProject.bind(this)}>X</button>
						<div className="skillSelector">
						<div className="createProjectSkills">
							<h1 style={{paddingTop: '10px'}}>{this.state.project.title}</h1>
							<div>Description: <span>{this.state.project.description}</span></div>
							<div>Please select the skills you require for this project</div>
								{Utils.getSkills().map((skill, i) => {
									var skillClassName = '';
									if(this.state.project.req_skills.indexOf(skill) > -1) 
										skillClassName = "skill-selected" 
									else
										skillClassName = "skill-deselected"
									return (
										<button key={i} className={skillClassName + " animated flipInX pure-button"} onClick={this.handleSkillSelect.bind(this, skill)}>
											{skill}
										</button> )
								})}
							</div>
							<button className="pure-button createProjectSubmit pure-button" onClick={this.submitProject.bind(this)}>Submit</button>
							<div className="projectWarning-hidden animated tada">Please choose at least one skill</div>
						</div>
					</div>
				)
			case 2:
				return (
					<div className="stage">
						<button type="button" className="projectCancelButton pure-button" onClick={this.cancelProject.bind(this)}>X</button>
							<form className="pure-form create-project">
							    <fieldset className="pure-group">
							    	<div className='pure-div-1-2'>The repo named {this.state.project.title} does not exist, we can create it for you!</div>
							        <textarea className="pure-input-1-2" onChange={this.handleDescChange.bind(this)} value='' placeholder="Please enter a short description of the repository"></textarea>
							    </fieldset>
							    <button type="button" onClick={this.setState.bind(this, {stage: 1})} className="pure-button pure-input-1-2 pure-button-primary project-next">Next</button>
						    </form>
					</div>
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