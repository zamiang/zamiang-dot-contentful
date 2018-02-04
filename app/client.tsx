import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import preRenderMiddleware from './middlewares/preRenderMiddleware';
import createRoutes from './routes';
import configureStore from './store/configureStore';

// Grab the state from a global injected into server-generated HTML
/* tslint:disable */

const initialState = (window as any)['__INITIAL_STATE__'];

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes();

// Callback function handling frontend route changes.
function onUpdate() {
  // Prevent duplicate fetches when first loaded.
  if ((window as any)['__INITIAL_STATE__'] !== null) {
    (window as any)['__INITIAL_STATE__'] = null;
    return;
  }
  /* tslint:enable */

  const { components, params } = this.state;

  preRenderMiddleware(store, components, params);
}

// Router converts <Route> element hierarchy to a route config:
render(
  <Provider store={store}>
    <Router history={history} onUpdate={onUpdate}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app'),
);
