import { GraphQLInt, GraphQLBoolean, GraphQLList } from "graphql";
import Post from "./post";
import { fetchPosts } from "./resolvers";

const Posts = {
  type: new GraphQLList(Post.type),
  description: "A list of Posts",
  args: {
    page: {
      type: GraphQLInt,
    },
  },
  resolve: (root, options) => {
    return fetchPosts(options);
  },
};

export default Posts;
