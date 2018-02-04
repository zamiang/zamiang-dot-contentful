import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import navigation from './navigation';
import posts from './posts';

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
  posts,
  navigation,
  routing,
});

export default rootReducer;
