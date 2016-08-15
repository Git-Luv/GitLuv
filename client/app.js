import React from 'react';
import { Router, Route, browserHistory } from 'react-router';


import Landing from './components/Landing';
import Swipe from './components/Swipe';
import Profile from './components/Profile';
import Project from './components/Project';
import Messages   from './components/Messages';
import SkillsList from './components/Skills';
import UserProfile from './components/Userprofile';

export default function App() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Landing} />
      <Route path='/swipe' component={Swipe} />
      <Route path='/profile' component={Profile} />
      <Route path='/project' component={Project} />
      <Router path='/messages' component={Messages} />
      <Route path='/skills' component={SkillsList} />
      <Route path='/userprofile/:user' component={UserProfile} />
    </Router>
  );
}
  