import axios from 'axios';
import * as express from 'express';
import { createMemoryHistory, match } from 'react-router';
import Error from '../../app/containers/NotFound';
import preRenderMiddleware from '../../app/middlewares/preRenderMiddleware';
import createRoutes from '../../app/routes';
import configureStore from '../../app/store/configureStore';
import { baseURL } from '../../config/env';
import pageRenderer from './pageRenderer';

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = baseURL;

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req: express.Request, res: express.Response) {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  const routes = createRoutes();

  match({ routes, location: req.url }, (err, redirectLocation, renderProps: any) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(store, renderProps.components, renderProps.params)
        .then(() => {
          const status = renderProps.routes.reduce((prevstatus: number, route: any) => {
            return route.status; // TODO? || prevstatus, undefined;
          });
          const html = pageRenderer(store, renderProps);
          return res.status(status || 200).send(html);
        })
        .catch((error: string) => {
          console.error(error);
          res.status(500).send(Error());
        });
    } else {
      res.status(404).send(Error());
    }
  });
}
