import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import Landing from './components/landing';
import Swipe from './components/swipe';

import configureStore from './store/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/' component={Landing} />
        <Route path='/swipe' component={Swipe} />
      </Router>
    </Provider>
  );
}
