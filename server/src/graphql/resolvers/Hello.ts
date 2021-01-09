import { IResolvers } from "apollo-server-express";

const helloResolver: IResolvers = {
  Query: {
    hello: (): string => {
      return "Hello, world!";
    },
  },
};

export default helloResolver;
