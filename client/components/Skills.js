import React from 'react'
import { browserHistory, Link } from 'react-router';
import fetch from 'isomorphic-fetch';


export default class SkillsList extends React.Component {
	constructor () {
		super ();
		this.state = {
			liked: false
		};
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick() {
		this.setState({liked: !this.setState.liked});
	}


	render() {
		const text=this.state.liked ? 'liked' : 'haven\'t liked';

		return (
			<div onClick = {this.handleClick}>
				You {text} this.
			</div>
		);
	}
};


// export default class SkillListRender extends React.Component{
// 		render() {
// 		return (
// 			<ul>
// 			{this.props.list.map(function(listValue){
// 				return <li>{listValue}</li>
// 			})}
// 			</ul> ) } }

// React.render(<SkillListRender list={[JavaScript, C++, Python, Java, Mithril]} />, document.getElementById('skill-list-render1'));
// React.render(<SkillListRender list = {[React, Redux, Angular, Node.js, Express, Shennanigans]} />, document.getElementById('skill-list-render2'));