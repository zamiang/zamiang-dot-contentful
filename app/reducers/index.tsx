import { combineReducers } from 'redux';
import navigation from './navigation';
import posts from './posts';

const rootReducer = combineReducers<any>({
  posts,
  navigation,
} as any); // TODO: add typings

export default rootReducer;
