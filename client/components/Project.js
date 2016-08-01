import React from 'react';
import { browserHistory, Link } from 'react-router';
import Sidebar from './sidebar'
import CreateProject from './createproject'

var dc = require('delightful-cookies');

export default class Project extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			isSidebar: false,
			project: null,
			isCreatingProject: null,
		}
	}

	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

	createProject() {
		console.log("CREATE PROJECT")
		this.setState({ isCreatingProject: true })
	}

	componentWillMount() {
		if(!dc.get('AuthToken')){
			browserHistory.pushState(null, '/')
		}
	}

	render() {
		console.log(this.state.isCreatingProject)
		return (
			<div className="profile" >
				<Sidebar state={this.state.isSidebar} />
				{ this.state.isCreatingProject ? <CreateProject /> : null }
				<div onClick={this.changeSidebarState.bind(this, false)}>
					<button className="sidebarButton" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
					{ this.state.project ? 
						<div>HELLO WORLD!</div> 
						:
					  <button type="button" className="button-like pure-button" onClick={this.createProject.bind(this)}>Create Project</button>
					}
				</div>
			</div>
			)
	}

}