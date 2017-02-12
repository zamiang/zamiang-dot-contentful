import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll/lib/useScroll';
import createRoutes from './routes';
import configureStore from './store/configureStore';
import preRenderMiddleware from './middlewares/preRenderMiddleware';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

// Callback function handling frontend route changes.
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  if (window.__INITIAL_STATE__ !== null) {
    window.__INITIAL_STATE__ = null;
    return;
  }

  const { components, params } = this.state;

  preRenderMiddleware(store, components, params);
}

// Router converts <Route> element hierarchy to a route config:
render(
  <Provider store={store}>
    <Router
      history={history}
      onUpdate={onUpdate}
      render={applyRouterMiddleware(useScroll())}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
