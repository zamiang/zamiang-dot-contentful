import { main } from './index';
import { get as httpGet, Server } from 'http';
import 'jest';

const ERRNO_KEY = 'errno';
const GRAPHIQL_ROUTE = '/graphiql';
const GRAPHQL_ROUTE = '/graphql';
const PORT: number = 3000;

function getFromServer(uri) {
  return new Promise((resolve, reject) => {
    httpGet(`http://localhost:${PORT}${uri}`, res => {
      resolve(res);
    }).on('error', (err: Error) => {
      reject(err);
    });
  });
}

describe('main', () => {
  it('should be able to Initialize a server (production)', () => {
    return main({
      env: 'production',
    }).then((server: Server) => {
      return server.close();
    });
  });

  it('should be able to Initialize a server (development)', () => {
    return main({
      env: 'development',
    }).then((server: Server) => {
      return server.close();
    });
  });

  it('should have a working GET graphql (developemnt)', () => {
    return main({
      env: 'development',
    }).then((server: Server) => {
      return getFromServer(GRAPHQL_ROUTE).then((res: any) => {
        server.close();
        // GET without query returns 400
        expect(res.statusCode).toBe(400);
      });
    });
  });

  it('should have a working GET graphql (production)', () => {
    return main({
      env: 'production',
    }).then((server: Server) => {
      return getFromServer(GRAPHQL_ROUTE).then((res: any) => {
        server.close();
        // GET without query returns 400
        expect(res.statusCode).toBe(400);
      });
    });
  });

  it('should have a working graphiql (developemnt)', () => {
    return main({
      env: 'development',
    }).then((server: Server) => {
      return getFromServer(GRAPHIQL_ROUTE).then((res: any) => {
        server.close();
        expect(res.statusCode).toBe(200);
      });
    });
  });

  it('should reject twice on same port', () => {
    return main({
      env: 'production',
    }).then((server: Server) => {
      return main({
        env: 'production',
      }).then(
        (secondServer: Server) => {
          server.close();
          secondServer.close();
          throw new Error('Was able to listen twice!');
        },
        (err: Error) => {
          server.close();
          expect(err[ERRNO_KEY]).toBe('EADDRINUSE');
        },
      );
    });
  });
});
