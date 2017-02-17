import { GraphQLSchema, GraphQLObjectType } from 'graphql';
import Status from './status';
import Post from './post';
import Posts from './posts';

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
