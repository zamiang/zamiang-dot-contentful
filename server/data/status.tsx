import { GraphQLObjectType, GraphQLBoolean } from "graphql";

const StatusType = new GraphQLObjectType({
  name: "Status",
  fields: {
    ping: {
      type: GraphQLBoolean,
      description: "GraphQL ping",
      resolve: () => true,
    },
  },
});

const Status = {
  type: StatusType,
  resolve: () => ({}),
};

export default Status;
