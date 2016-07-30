import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isSidebar: false,
		}
	}

	componentWillReceiveProps(nextProps) {
			this.setState({isSidebar: nextProps.state })
	}

	logoutUser() {
		
	}

	render() {
		return(
			<div className={ this.state.isSidebar ? 'sidebarOpen' : 'sidebarClose' }>
				<Link className="pure-button sidebar-button" to={`profile`}>Profile</Link>
				<Link className="pure-button sidebar-button" to={`swipe`}>Swipe</Link>
				<button className="pure-button sidebar-button-logout" onClick={this.logoutUser}>Logout</button>
			</div>
			)
	}
}