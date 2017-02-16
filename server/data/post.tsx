import { has } from 'lodash';
import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInterfaceType,
  GraphQLID,
} from 'graphql';
import { fetchPost } from './resolvers';

const PostType = new GraphQLObjectType({
  name: 'Post',
  isTypeOf: (obj) => has(obj, 'title') && has(obj, 'slug'),
  interfaces: [
    new GraphQLInterfaceType({
      name: 'Node',
      description: 'An object with a Globally Unique ID',
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLID),
          description: 'The ID of the object.',
        },
      }),
    })],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
    slug: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    date: {
      type: GraphQLString,
    }
  }),
});

const Post = {
  type: PostType,
  description: 'A Post',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The ID of the Article',
    },
  },
  resolve: (root, { id }) => fetchPost(id),
};

export default Post;
