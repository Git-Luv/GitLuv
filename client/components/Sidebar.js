import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as Profile from '../models/profile';
import * as notifyModel from '../models/notifications';
import NotifySystem from './NotifySystem';

var dc = require('delightful-cookies');


export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleHorizontal = this.toggleHorizontal.bind(this)
		this.state = {
			notifications: [],
			username: null,
			isNotifySystemOpen: false,
		}
	}

	componentWillMount() {
		if(!this.state.username){
			Profile.getUserData(dc.get('AuthToken').value)
			.then(res => {
				notifyModel.getUnread(res.login)
				.then(data => {
					this.setState({ username: res.login, notifications: data })
				})
			})
		}
	}

	toggleNotificationMenu() {
		this.setState({ isNotifySystemOpen: !this.state.isNotifySystemOpen })
		if(!this.state.isNotifySystemOpen)
			this.updateNotifications();
	}

	updateNotifications() {
		notifyModel.getUnread(this.state.username)
		.then(data => {
			this.setState({ notifications: data })
		})
	}

	getNotifyCount() {
		var count = 0;
		for(let i = 0; i < this.state.notifications.length; i++){
			if(!this.state.notifications[i].isRead){
				count++;
			}
		}
		if(count === 0){
			return null;
		}
		return count;
	}

	logoutUser() {
		document.cookie = 'AuthToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		browserHistory.pushState(null, '/')
	}
	
	function (window, document) {
	console.log('IN PARENT FUNCTION')

	var menu = document.getElementsByClassName('menuClass'),
	    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

	function closeMenu() {
	    console.log('IN CLOSE MENU')
	    if (menu.classList.contains('open')) {
	        toggleMenu();
	    }
	}

	this.refs.toggleClass.addEventListener('click', function (e) {
		console.log('IN TOGGLE GET ELEMENT')
	    toggleMenu();
	});

	window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
	}
	
	toggleMenu(e) {
		e.preventDefault()
		console.log('TOGGLEMENU', e)
	    // set timeout so that the panel has a chance to roll up
	    // before the menu switches states
	    if (menu.classList.contains('open')) {
	        setTimeout(this.toggleHorizontal, 500);
	        console.log('IN TOGGLE MENU IF')

	    }
	    else {
	    	console.log('IN TOGGLE MENU ELSE')

	        this.toggleHorizontal();
	    }
	    menu.classList.toggle('open');
	    this.refs.toggleClass.classList.toggle('x');
	};
	
	toggleHorizontal() {
	    [].forEach.call(
	        this.refs.menuClass.querySelectorAll('.custom-can-transform'),
	        function(el){
	            el.classList.toggle('pure-menu-horizontal');
	            console.log('IN TOGGLE HORIZONTAL')
	        }
	    );
	    	console.log('toggleHorizontal', this)
	};

	render() {
		return(
			<div className="custom-wrapper pure-g " ref="menuClass" id="menu">
			    <div className="pure-u-1 pure-u-md-1-4">
			        <div className="pure-menu">
			            <a href="#" className="pure-menu-heading custom-brand menu-item l-box logo">GitLuv</a>
			            <a href="#" className="custom-toggle" ref="toggleClass" id="toggle" onClick={this.toggleMenu}><s className="bar"></s><s className="bar"></s></a>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-6">
			        <div className="menu-links pure-menu pure-menu-horizontal custom-can-transform">
			            <ul className="pure-menu-list">
			                <li className="pure-menu-item"><Link to={`profile`} className="pure-menu-link  l-box">PROFILE</Link></li>
			                <li className="pure-menu-item"><Link to={`swipe`} className="pure-menu-link l-box">SWIPE</Link></li>
			                <li className="pure-menu-item"><Link to={`project`} className="pure-menu-link l-box">PROJECTS</Link></li>
			                <li className="pure-menu-item menu-links pure-menu custom-menu-3 custom-can-transform"><a onClick={this.toggleNotificationMenu.bind(this)} className="pure-menu-link menu-item l-box">Notify <span>{this.getNotifyCount()}</span></a></li>
			                <li className="pure-menu-item menu-links pure-menu custom-menu-3 custom-can-transform"><a onClick={this.logoutUser} className="pure-menu-link menu-item l-box">LOGOUT</a></li>
			            </ul>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3">
			    </div>
			    { this.state.isNotifySystemOpen ? 
				    <NotifySystem sidebar={this} />
			    : null }
			</div>
			)
	}
}


			// <div className={ this.state.isSidebar ? 'sidebarOpen' : 'sidebarClose' }>
			// 	<Link className="pure-button sidebar-button" to={`profile`}>Profile</Link>
			// 	<Link className="pure-button sidebar-button" to={`swipe`}>Swipe</Link>
			// 	<Link className="pure-button sidebar-button" to={`project`}>Projects</Link>
			// 	<button className="pure-button sidebar-button-logout" onClick={this.logoutUser}>Logout</button>
			// </div>


