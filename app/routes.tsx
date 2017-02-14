import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Post from './containers/Post';
import Posts from './containers/Posts';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/posts" component={Posts} />
      <Route path="/post/:postSlug" component={Post} />
    </Route>
  );
};
