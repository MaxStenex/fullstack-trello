import helloQuery from "./query/hello";

import userMutation from "./mutation/user";

import { MutationResolvers, QueryResolvers } from "../types/generated";

const resolvers: { Query: QueryResolvers; Mutation: MutationResolvers } = {
  Query: {
    ...helloQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

export default resolvers;
