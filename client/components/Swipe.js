import React from 'react';
import { browserHistory, Link } from 'react-router';

import * as model from '../models/swipe'

export default class Swipe extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: {
				username: null,
				location: null,
				bio: null,
				avatar: null,
			}
		}
	}

  render() {
	  return (
	    <div>
	     	Welcome to GITLUV!
	     	<div>
	     		<button type="button"><Link to={`profile`}>Profile</Link></button>
	     	</div>
	    </div>
	  )
	}
}
