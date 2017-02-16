import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as methodOverride from 'method-override';
import { printSchema } from 'graphql/utilities/schemaPrinter';
import { apolloExpress, graphiqlExpress } from 'graphql-server/dist/integrations/expressApollo';
import schema from '../data/schema';

// import { ExpressGraphQLOptionsFunction } from 'graphql-server-express';

const ENV = process.env.NODE_ENV || 'development';

export default (app: any) => {
  app.set('port', (process.env.PORT || 3000));

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.set('views', path.join(__dirname, '..', 'views'));

  app.set('view cache', false);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/graphiql", graphiqlExpress({ endpointURL: '/graphql' }));
  app.use('/graphql', bodyParser.json(), apolloExpress({ schema }));

  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy
  app.set('trust proxy', 'loopback');

  console.log('--------------------------');
  console.log('===>  Starting Server . . .');
  console.log(`===>  Environment: ${ENV}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  console.log('--------------------------');
};
