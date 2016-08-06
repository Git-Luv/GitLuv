import React from 'react';
import { browserHistory, Link } from 'react-router';
import * as User from '../models/users';

var dc = require('delightful-cookies');

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleHorizontal = this.toggleHorizontal.bind(this)
	}

	logoutUser() {
		User.logout(dc.get('AuthToken').value)
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
			    <div className="pure-u-1 pure-u-md-1-3">
			        <div className="pure-menu">
			            <a href="#" className="pure-menu-heading custom-brand menu-item">GitLuv</a>
			            <a href="#" className="custom-toggle" ref="toggleClass" id="toggle" onClick={this.toggleMenu}><s className="bar"></s><s className="bar"></s></a>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3">
			        <div className="menu-links pure-menu pure-menu-horizontal custom-can-transform">
			            <ul className="pure-menu-list">
			                <li className="pure-menu-item"><Link to={`profile`} className="pure-menu-link  l-box">Profile</Link></li>
			                <li className="pure-menu-item"><Link to={`swipe`} className="pure-menu-link l-box">Swipe</Link></li>
			                <li className="pure-menu-item"><Link to={`project`} className="pure-menu-link l-box">Projects</Link></li>
			            </ul>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3">
			        <div className="menu-links pure-menu pure-menu-horizontal custom-menu-3 custom-can-transform">
			            <ul className="pure-menu-list">
			                <li className="pure-menu-item"><a onClick={this.logoutUser} className="pure-menu-link menu-item">Logout</a></li>
			            </ul>
			        </div>
			    </div>
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


