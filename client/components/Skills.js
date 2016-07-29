import React, {Component} from 'react'



export default class SkillsList extends Component {
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
				You {text} this. Click to toggle.
			</div>
		);
	}
}

