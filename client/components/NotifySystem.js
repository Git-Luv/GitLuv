import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as NotifyModel from '../models/notifications';

var dc = require('delightful-cookies');

export default class NotifySystem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentWillMount() {
		
	}

	render() {
		return(
			<div className="NotifySystemMenu">
			</div>
		)
	}
}