import { IResolvers } from "apollo-server-express";

import helloResolver from "./Hello";

const resolvers: IResolvers[] = [helloResolver];

export default resolvers;
