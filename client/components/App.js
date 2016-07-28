import React, { Component } from 'react';
import Login from '../containers/login';
import Landing from './Landing';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: false
		}
	}
	render(){
		if(this.state.login === false) {
			return (<Login />)
		} else {
		return (
			<div className="login">
				<Login />
			</div>
		)}
	}
}