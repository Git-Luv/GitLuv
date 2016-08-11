import React from 'react';
import Sidebar from './sidebar';
import moment from 'moment';
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
			messages : [],
			open     : null,

		}
	}

	componentDidMount () {
		let self = this	

		this.setState({username: this.props.username,
											 room: this.props.room,
								  visionary: this.props.visionary,
								  developer: this.props.developer,
											 open: this.props.open || null})

		Chat.getChatroom(this.props.room)
		.then(room => {
			console.log("room in getChatroom: ", room)
			this.setState({messages: room.messages})
		})

		socket.emit("subscribe", this.props.room);

    socket.on("chat message", function(msg) {
    	console.log("Step 4 msg in socket.on client: ", msg)

    	let newMess = [{sentby: msg.sentBy, message: msg.message}]

    	if(self.state.room === msg.room){
    		self.setState({messages: self.state.messages.concat(msg)})
    	}
  	})
	}

	_handleSubmit (event) {
		event.preventDefault();

		var self = this;

		console.log("step 1 --- ChatBox.js: ", {room: this.state.room, sentBy: this.state.username, message: this.state.text})

		socket.emit("send", {
		  room   : this.state.room,
		  sentBy : this.state.username, 
		  message: this.state.text,
		  time   : moment()
		})

			// clear input after each message
		self.setState({
			text: ""
		})

	}

	render () {

		return (
			<div className="chatBox">
				<div className="messages">
					<table className="table table-hover">
						<tbody>
							{
								this.state.messages.map(function (msg,index) {
									return (
										<Message key={index} name={msg.sentBy} message={msg.message} time={msg.time}/>
									)
								})
							}
						</tbody>
					</table>
					<form onSubmit={this._handleSubmit.bind(this)} >
						<input
							type="text"
							value={this.state.text}
							className="u-full-width"
							placeholder="send a message!"
							id="chatInput"
							onChange={event => this.setState({text: event.target.value})}
							autoComplete="off"
							/>

						<input type="submit" style={{visibility: "hidden"}}></input>
					</form>
				</div>
			</div>
		)
	}
}

class Message extends React.Component {
	render() {
		return (

				<div className="chat-body">
          <div className="chat-one">
            <div className="chat-name">{this.props.name}</div>
            <div className="chat-time">{moment(this.props.time).fromNow()}</div>
          </div>
          <div className="chat-message">{this.props.message}</div>
        </div>

		)
	}
}