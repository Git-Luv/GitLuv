import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './components/landing';
import Swipe from './components/swipe';
import Profile from './components/profile';
import Project from './components/project';

export default function App() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Landing} />
      <Route path='/swipe' component={Swipe} />
      <Route path='/profile' component={Profile} />
      <Route path='/project' component={Project} />
    </Router>
  );
}
