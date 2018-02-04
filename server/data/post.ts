import { GraphQLNonNull, GraphQLString } from 'graphql';
import PostType from './postType';
import { fetchPost } from './resolvers';

const Post = {
  type: PostType,
  description: 'A Post',
  args: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The slug of the Post',
    },
  },
  resolve: async (root, { slug }) => {
    return fetchPost(slug);
  },
};

export default Post;
