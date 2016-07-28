import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './components/landing';
import Swipe from './components/swipe';

export default function App() {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={Landing} />
      <Route path='/swipe' component={Swipe} />
    </Router>
  );
}
