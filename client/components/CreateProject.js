import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as model from '../models/project';

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
					var repo = model.getRepoData(this.state.input0)
					console.log(repo)
					this.setState({ project: {
						name: repo.name,
						description: repo.description,
					} })
				}
		}
	}

	returnStage(stage) {
		switch(stage){
			case 0:
				return (
					<div>
					Repo name: <input onChange={this.handleChange.bind(this)} />
					<div>
						<button type="button" className="button-like pure-button" onClick={this.handleNextStage.bind(this, 'skip')}>Skip</button>
						<button type="button" className="button-like pure-button" onClick={this.handleNextStage.bind(this, 'next')}>Next</button>
					</div>
					</div>
					)
			case 1:
				return (
					<div>
						<div>Project Name: <input value={this.state.project.name} /></div>
						<div>Project Name: <textarea value={this.state.project.description} /></div>
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