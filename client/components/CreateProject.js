import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as model from '../models/project';
import * as Projects from '../models/projects'

var skills = [
"React", "Angular.js", "Redux", "Mithril", "Backbone", "Node.js", "Express", "Git", "Passport", "Socket.io", "Mongo", "Mongoose", "Test Driven Development", "Continuous Deployment", "Agile Methodology", "Waterfall Methodology", "OAuth", "PHP", "Postgress", "KNEX", "Browserify", "Webpack", "Grunt", "Gulp", "CSS", "HTML", "ES2015", "React Native", "React-Router"]

export default class CreateProject extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			stage: 0,
			input0: "",
			project: {
				name: null,
				description: null,
				skillsNeeded: [],
			}
		}
	}

	handleChange(event) {
		this.setState({ input0: event.target.value })
	}

	handleNextStage(command) {
		switch(this.state.stage){
			case 0:
				if(command === 'skip'){
					this.setState({ stage: 1 });
				} else {
					model.getRepoData(this.state.input0)
					.then(repo => {
						this.setState({ project: {
							name: repo.name,
							description: repo.description,
							username:       repo.owner.login,
							repo_url:       repo.html_url,
							description:    repo.description,
							location:       null,
							req_skills:     [],
							users_liked:    [],
							users_disliked: [],
						}, stage: 1 })
					})
				}
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
		Projects.addProject(this.state.project)
		.then(res => {
			this.props.project.setState({ isCreatingProject: false });
		})
	}

	returnStage(stage) {
		switch(stage){
			case 0:
				return (
					<div>
					Repo name: <input onChange={this.handleChange.bind(this)} />
					<div>
						<button type="button" className="button-like pure-button" onClick={this.handleNextStage.bind(this, 'next')}>Next</button>
					</div>
					</div>
					)
			case 1:
				return (
					<div>
						<div>Project Name: <h1>{this.state.project.name}</h1></div>
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