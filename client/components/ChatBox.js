import React from 'react';
import Sidebar from './sidebar';
import * as Chat from '../models/chat';
import * as model from '../models/profile';

var dc = require('delightful-cookies');

export default class ChatBox extends React.Component {
		
	constructor (props) {
		super(props);
		this.state = {
			username : "",
			developer: null,
			visionary: null,
			room     : null,
			text     : "",
			messages : []
		}
	}

	componentDidMount () {
		this.setState({username: this.props.username,
											 room: this.props.room})
		let self = this

		Chat.getChatroom(this.props.room)
		.then(room => {
			console.log(room)
			this.setState({messages: room.messages})
		})

		socket.on('send', function(x){
			let msgs = self.state.messages
			self.setState({messages: msgs.concat(x)})
		})
	}

	_handleSubmit (e) {
		// e.preventDefault();

		// var self = this;

	Chat.editChatroom(this.props.username, {messages: [{sentBy: this.state.username, message: this.state.text}]})
		.then(function(x){

			socket.emit("send", {
			  room   : this.chatRoom,
			  sentBy : this.state.username, 
			  message: this.state.chatText
			})

			// clear input after each message
			this.setState({
				text: ""
			})
		})
	}

	render () {

		return (
			<div className="chatBox">
				<div className="messages">
					<form onSubmit={this._handleSubmit.bind(this)}>
						<input
							type="text"
							value={this.state.text}
							className="u-full-width"
							placeholder="send a message!"
							id="chatInput"
							onChange={event => this.setState({chatText: event.target.value})}
							/>

						<input type="submit" style={{visibility: "hidden"}}></input>
					</form>
					<table className="table table-hover">
						<tbody>
							{
								this.state.messages.map(function (msg,index) {
									return (
										<Message key={index} name={msg.sentBy} message={msg.message}/>
									)
								})
							}
						</tbody>
					</table>
				</div>

			</div>
		)
	}
}

class Message extends React.Component {
	render() {
		return (
			<tr className="message">
				<td className="text-left">{this.props.name}</td>
				<td className="text-right">{this.props.message}</td>
			</tr>
		)
	}
}