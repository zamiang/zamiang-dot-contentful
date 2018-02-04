import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import * as createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { isClient, isDebug } from '../../config/env';
import promiseMiddleware from '../middlewares/promiseMiddleware';
import rootReducer from '../reducers/index';

export default function configureStore(initialState: any, history: any) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, promiseMiddleware, routerMiddleware(history)];

  let store: any;

  if (isClient && isDebug) {
    middleware.push(createLogger());
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), (f: any) => f),
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(...middleware), (f: any) => f),
    );
  }
  return store;
}
