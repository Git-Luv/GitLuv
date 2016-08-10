import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as NotifyModel from '../models/notifications';
import * as Profile from '../models/profile';
import * as Utils from '../utils';

var dc = require('delightful-cookies');

export default class NotifySystem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notifications: [],
		}
	}

	componentWillMount() {
		Profile.getUserData(dc.get('AuthToken').value)
		.then(res => {
			NotifyModel.get(res.login)
			.then(data => {
				this.setState({ notifications: data })
			})
		})
	}

	render() {
		return(
			<div className="NotifySystemMenu">
				<div className="notifications">
					{ this.state.notifications.map(item => {
						return (
							<div className={ item.isRead ? "notification-unread" : "notification-read" }>
								<span>{item.description}</span>
								<br/>
								<span>{Utils.convertTimeToString(item.created)}</span>
							</div>
						)
					}) }
				</div>
			</div>
		)
	}
}