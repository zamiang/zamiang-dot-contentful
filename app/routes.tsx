import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Posts from './containers/Posts';
import Post from './containers/Post';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/posts" component={Posts} />
      <Route path="/post/:articleSlug" component={Post} />
    </Route>
  );
};
