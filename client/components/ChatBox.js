import React from 'react'
import Sidebar from './sidebar';

export default class extends React.Component {
	  
	constructor(props) {
   	super(props);
    this.state = {
    	developer: null,
    	visionary: null,
      text     : "",
      messages : []
    }
  }

  componentDidMount(){

  }

  render () {
  	return (<div></div>)
  }


}