import React from 'react';
import { browserHistory, Link } from 'react-router';
import ChatBox from './ChatBox'
import * as model from '../models/profile';

import * as Chat from '../models/chat'

var dc = require('delightful-cookies');

export default class Messages extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = {
			username: "",
			chats: [],
		}
	}

	componentDidMount () {
		var self = this

		model.getUserData(dc.get('AuthToken').value)
		.then(function(userInfo) {

			self.setState({username: userInfo.login})			

			Chat.getAllChatrooms()
			.then(function(chats){
				let chatArr = [];
				chats.map(function(chat){
					if( self.state.username === chat.developer ||
						  self.state.username === chat.visionary ){
						chatArr.push(chat)
					}
				})
				self.setState({chats: chatArr})
			})
		})
	}


	render () {
		var self = this
		return (<div>
			{this.state.chats.map(function(chatbox){
				// console.log(chatbox)
				<ChatBox username={self.state.username} />
			})}
		</div>)
	}


}