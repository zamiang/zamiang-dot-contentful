import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import PostType from './postType';
import { fetchPosts } from './resolvers';

const PageInfo = new GraphQLObjectType({
  name: 'PageInfo',
  fields: {
    total: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});

const PostEdge = new GraphQLObjectType({
  name: 'PostEdge',
  description: 'Posts under node',
  fields: () => ({
    node: {
      type: PostType,
      resolve(parent) {
        return parent;
      },
    },
  }),
});

const PostConnection = new GraphQLObjectType({
  name: 'PostConnection',
  fields: () => ({
    edges: {
      type: new GraphQLList(PostEdge),
      resolve(res) {
        return res.posts;
      },
    },
    pageInfo: {
      type: new GraphQLNonNull(PageInfo),
      resolve(parent) {
        return { total: parent.total };
      },
    },
  }),
});

const Posts = {
  type: PostConnection,
  description: 'A list of Posts',
  args: {
    page: {
      type: GraphQLInt,
    },
  },
  resolve: async (root: any, options: any) => {
    return fetchPosts(options);
  },
};

export default Posts;
