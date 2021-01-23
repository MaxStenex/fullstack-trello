import helloQuery from "./query/hello";
import userQuery from "./query/user";
import taskQuery from "./query/tasks";

import userMutation from "./mutation/user";
import tasksMutation from "./mutation/tasks";

import { MutationResolvers, QueryResolvers } from "../types/generated";

const resolvers: { Query: QueryResolvers; Mutation: MutationResolvers } = {
  Query: {
    ...helloQuery,
    ...userQuery,
    ...taskQuery,
  },
  Mutation: {
    ...userMutation,
    ...tasksMutation,
  },
};

export default resolvers;
