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

	render() {
		return(
			<div className={ this.state.isSidebar ? 'sidebarOpen' : 'sidebarClose' }>
				<Link className="button-profile pure-button sidebar-button" to={`swipe`}>Swipe</Link>
				<Link className="button-profile pure-button sidebar-button" to={`profile`}>Profile</Link>
			</div>
			)
	}
}