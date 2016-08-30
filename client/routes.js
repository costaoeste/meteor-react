import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import AppContainer from '../imports/ui/containers/AppContainer.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>

    </Route>
  </Router>
);
