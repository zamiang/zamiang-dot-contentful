import { makeExecutableSchema } from 'graphql-tools';
import { fetchPost, fetchPosts, fetchStatus } from './resolvers';
import * as schemaGql from './schema.graphql';

const resolveFunctions = {
  RootQueryType: {
    status: fetchStatus,
    post: fetchPost,
    posts: fetchPosts,
  },
};

const logger = {
  log: (e: any) => {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
      /* tslint:disable no-console */
      console.log(e);
      /* tslint:enable no-console */
    }
  },
};

const schema = makeExecutableSchema({
  typeDefs: schemaGql,
  resolvers: resolveFunctions,
  logger,
} as any);

export default schema;
