import React from 'react';
import { browserHistory, Link } from 'react-router';

export default class Home extends React.Component {
	render() { 
	  return (
	    <div>
	      <div> This is the home page </div>
	      <Link to="/PageOne"> Page 1 </Link>
	      <button onClick={() => browserHistory.push('/PageTwo')} >
	        Page 2
	      </button>
	    </div>
	  );
	}
}
