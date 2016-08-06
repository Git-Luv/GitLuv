import React from 'react';
import { browserHistory, Link } from 'react-router';

var dc = require('delightful-cookies');


export default class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggleMenu = this.toggleMenu.bind(this)
		this.toggleHorizontal = this.toggleHorizontal.bind(this)
	}

	componentDidMount() {

		if(dc.get('AuthToken')){
			// Take all browser's cookies and find the one we need
			model.getUserData(dc.get('AuthToken').value)
			.then(res => {
				// console.log('res', res)
				this.setState({username: res.login});

				// grab all projects from db
		 		Projects.getAllProjects()
		 		.then(x => {
		 			var allProjects = [];
		 			x.forEach((project) => {
		 				if (project.users_liked.indexOf(res.login) === -1 && project.users_disliked.indexOf(res.login) === -1) {
		 					allProjects.push(project)
		 				}
		 			})
		 			// grab user info including user skills
		 			Users.getUser(res.login)
		 			.then(res => {
		 				//add user skills to this.state.userSkills
		 				this.setState({userSkills: res.skills})
						allProjects.forEach(project => {
			 				project.commonSkills = Utils.getCommonSkillCount(res, project);
		 				})
		 				// Sort based on the amount of commonSkills
		 				allProjects = allProjects.sort((a, b) => {
		 					if(a.commonSkills < b.commonSkills){
		 						return 1;
		 					} else if(a.commonSkills > b.commonSkills){
		 						return -1;
		 					} else {
		 						return 0;
		 					}
		 				})
		 				this.setState({projects: allProjects})
		 			})
		 		})
			})
		} else {
			browserHistory.pushState(null, '/');
		}
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
			            <a href="#" className="pure-menu-heading custom-brand menu-item l-box">GitLuv</a>
			            <a href="#" className="custom-toggle" ref="toggleClass" id="toggle" onClick={this.toggleMenu}><s className="bar"></s><s className="bar"></s></a>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-6">
			        <div className="menu-links pure-menu pure-menu-horizontal custom-can-transform">
			            <ul className="pure-menu-list">
			                <li className="pure-menu-item"><Link to={`profile`} className="pure-menu-link  l-box">PROFILE</Link></li>
			                <li className="pure-menu-item"><Link to={`swipe`} className="pure-menu-link l-box">SWIPE</Link></li>
			                <li className="pure-menu-item"><Link to={`project`} className="pure-menu-link l-box">PROJECTS</Link></li>
			                <li className="pure-menu-item menu-links pure-menu custom-menu-3 custom-can-transform"><a onClick={this.logoutUser} className="pure-menu-link menu-item l-box">LOGOUT</a></li>
			            </ul>
			        </div>
			    </div>
			    <div className="pure-u-1 pure-u-md-1-3">
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


