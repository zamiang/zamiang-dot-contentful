import {
  GraphQLString,
  GraphQLNonNull,
} from "graphql";
import { fetchPost } from "./resolvers";
import PostType from "./postType";

const Post = {
  type: PostType,
  description: "A Post",
  args: {
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The slug of the Post",
    },
  },
  resolve: (root, { slug }) => {
    return fetchPost(slug);
  },
};

export default Post;
