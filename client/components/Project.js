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
		}
	}

	changeSidebarState(state) {
		if(state !== this.state.isSidebar){
			this.setState({ isSidebar: state })
		}
	}

	createProject() {

	}

	componentWillMount() {
		if(!dc.get('AuthToken')){
			browserHistory.pushState(null, '/')
		}
	}

	render() {
		return (
			<div className="profile" >
				<Sidebar state={this.state.isSidebar} />
				<CreateProject />
				<div onClick={this.changeSidebarState.bind(this, false)}>
					<button className="sidebarButton" onClick={this.changeSidebarState.bind(this, true)}>|||</button>
					{ this.state.project ? 
						<div>HELLO WORLD!</div> 
						:
					  <button type="button" className="button-like pure-button" onClick={this.createProject}>Create Project</button>
					}
				</div>
			</div>
			)
	}

}