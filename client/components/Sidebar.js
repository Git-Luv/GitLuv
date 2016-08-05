import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
	}

	logoutUser() {
		document.cookie = 'AuthToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
		browserHistory.pushState(null, '/')
	}
	
	function (window, document) {
	var menu = document.getElementById('menu'),
	    WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

	function toggleHorizontal() {
	    [].forEach.call(
	        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
	        function(el){
	            el.classList.toggle('pure-menu-horizontal');
	        }
	    );
	};

	function toggleMenu() {
	    // set timeout so that the panel has a chance to roll up
	    // before the menu switches states
	    if (menu.classList.contains('open')) {
	        setTimeout(toggleHorizontal, 500);
	    }
	    else {
	        toggleHorizontal();
	    }
	    menu.classList.toggle('open');
	    document.getElementById('toggle').classList.toggle('x');
	};

	function closeMenu() {
	    if (menu.classList.contains('open')) {
	        toggleMenu();
	    }
	}

	document.getElementById('toggle').addEventListener('click', function (e) {
	    toggleMenu();
	});

	window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
	}

	render() {
		return(
			<div className="custom-wrapper pure-g" id="menu">
			    <div className="pure-u-1 pure-u-md-1-3">
			        <div className="pure-menu">
			            <a href="#" className="pure-menu-heading custom-brand menu-item">GitLuv</a>
			            <a href="#" className="custom-toggle" id="toggle"><s className="bar"></s><s className="bar"></s></a>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3">
			        <div className="menu-links pure-menu pure-menu-horizontal custom-can-transform">
			            <ul className="pure-menu-list">
			                <li className="pure-menu-item"><Link to={`profile`} className="pure-menu-link  l-box">Profile</Link></li>
			                <li className="pure-menu-item"><Link to={`swipe`} className="pure-menu-link l-box">Swipe</Link></li>
			                <li className="pure-menu-item"><Link to={`project`} className="pure-menu-link l-box">Projects</Link></li>
			                <li className="pure-menu-item"><Link to={`messages`} className="pure-menu-link l-box">Messages</Link></li>
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