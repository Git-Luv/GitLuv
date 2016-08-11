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

	handleNotifyClick(item) {
		if(!item.isRead){
			NotifyModel.read({ id: item._id }, () => {
				this.props.sidebar.updateNotifications.call(this.props.sidebar);
			})

			var temp = [];
			for(let i = 0; i < this.state.notifications.length; i++){
				var obj = this.state.notifications[i];
				if(item._id === obj._id){
					obj.isRead = true;
				}
				temp.push(obj);
			}

			temp = temp.sort((a, b) => {
				
			})

			this.setState({ notifications: temp })
		}
	}

	render() {
		return(
			<div className="NotifySystemMenu">
				<div className="notifications">
					{ this.state.notifications.length === 0 ? 
							<div style={{
								letterSpacing: "0em"
							}}>There are currently no notifications</div>
					:
						this.state.notifications.map((item, i) => {
							return (
									<div className={ item.isRead ? "notification-unread" : "notification-read" } key={i} onClick={this.handleNotifyClick.bind(this, item)}>
										<span className="notify-description">{item.description}</span>
										<br/>
										<span className="notify-timeCreated">{Utils.convertTimeToString(item.created)}</span>
									</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}