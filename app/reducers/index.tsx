import { combineReducers } from 'redux';
import posts from './posts';
import navigation from './navigation';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
  posts,
  navigation,
  routing
});

export default rootReducer;
