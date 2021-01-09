import {
  mergeResolvers,
  loadSchemaSync,
  GraphQLFileLoader,
  addResolversToSchema,
} from "graphql-tools";
import { GraphQLSchema } from "graphql";
import resolvers from "./resolvers";

const schema = loadSchemaSync(`${__dirname}/schemas/schema.graphql`, {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers: GraphQLSchema = addResolversToSchema({
  schema,
  resolvers: mergeResolvers(resolvers),
});

export default schemaWithResolvers;
