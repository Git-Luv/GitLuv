import React from 'react';
import { browserHistory, Link } from 'react-router';
import ChatBox from './ChatBox'
import Sidebar from './sidebar'
import * as model from '../models/profile';
import * as Chat from '../models/chat'

import { Accordion, AccordionItem } from 'react-sanfona';

var dc = require('delightful-cookies');

export default class Messages extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = {
			username: "",
			chats: [],
			chatRoom: null
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

		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
			}	
		}
	// preexisting to addition of users who like functionality
		if(!dc.get('AuthToken')){
			browserHistory.pushState(null, '/')
		}

		document.getElementsByClassName('accordion').onclick = function() {

		    var className = ' ' + accordion.className + ' ';

		    if ( ~className.indexOf(' active ') ) {
		        this.className = className.replace(' active ', ' ');
		    } else {
		        this.className += ' active';
		    }              
		}
	}

	toggleAccordion(e) {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
    		}	
		}
	}


	render () {
		var self = this
		return (<div>
			<Sidebar />
				
					{this.state.chats.map(function(chatBox, i){
						let chatName;
						if(self.state.username === chatBox.developer){
							chatName = chatBox.visionary
						} else {
							chatName = chatBox.developer
						}

						return(
							<div className='accordionContainer' key={i}>
				        <button className="accordion" title={`${ chatName }`}  onClick={self.toggleAccordion} key={i} >{chatName}</button>
				          <div className="panel">
										<ChatBox username={self.state.username} room={chatBox.chatRoom} visionary={chatBox.visionary} developer={chatBox.developer}/>
									</div>
							</div>
							
						)
					})}

		</div>)
	}
}



