import helloQuery from "./query/hello";
import userQuery from "./query/user";

import userMutation from "./mutation/user";

import { MutationResolvers, QueryResolvers } from "../types/generated";

const resolvers: { Query: QueryResolvers; Mutation: MutationResolvers } = {
  Query: {
    ...helloQuery,
    ...userQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

export default resolvers;
