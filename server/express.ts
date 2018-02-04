import * as bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import * as path from 'path';
import schema from './data/schema';

export default (app: any) => {
  app.set('port', process.env.PORT || 3000);

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site"s profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy
  app.set('trust proxy', 'loopback');
};
