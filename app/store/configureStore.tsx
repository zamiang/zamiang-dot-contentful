import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import rootReducer from '../reducers/index';
import { isClient, isDebug } from '../../config/env';

export default function configureStore(initialState: any, history: any) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];

  let store: any;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middleware), (f: any) => f
    ));
  } else {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), (f: any) => f));
  }

  /*
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');

      store.replaceReducer(nextReducer);
    });
  }
  */
  return store;
}
