import * as React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Article from './containers/Article';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="articles/:pageNumber" component={Home} />
      <Route path="article/:articleSlug" component={Article} />
    </Route>
  );
};
