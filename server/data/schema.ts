import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import Post from './post';
import Posts from './posts';
import Status from './status';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      status: Status,
      post: Post,
      posts: Posts,
    },
  }),
});

export default schema;
