import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

<<<<<<< HEAD
import Landing    from './components/landing';
import Swipe      from './components/swipe';
import Profile    from './components/profile';
import Project    from './components/project';
import Messages   from './components/messages'
import SkillsList from './components/skills';
=======
import Landing from './components/landing';
import Swipe from './components/swipe';
import Profile from './components/profile';
import Project from './components/project';
import SkillsList from './components/skills';
import UserProfile from './components/userprofile';
>>>>>>> dbb7c0ac9e64583a967811cc4fb6445bb79506fb

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
