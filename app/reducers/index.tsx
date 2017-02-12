import { combineReducers } from 'redux';
import article from './article';
import navigation from './navigation';
import siteData from './site-data';
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of router state
const rootReducer = combineReducers({
  siteData,
  article,
  navigation,
  routing
});

export default rootReducer;
