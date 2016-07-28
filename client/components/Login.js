import React, { Component } from 'react';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			loggedIn: false }
		this.onInputChange = this.onInputChange.bind(this)
		this.onFormSubmit = this.onFormSubmit.bind(this)
	}

	onFormSubmit(event) {
		event.preventDefault();
	}
 
	onInputChange(event) {
		this.setState({username: event.target.value})
	}

	render() {
		return (
			<form onSubmit= {this.onFormSubmit} >
				<input
					placeholder="Username"
					value={this.state.term}
					onChange={this.onInputChange} />
		)
	}
}