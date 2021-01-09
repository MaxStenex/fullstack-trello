import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";

const main = async () => {
  const app = express();
  const server = new ApolloServer({ schema });

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Server ready at http://localhost:4000/graphql"));
};

main().catch((err) => {
  console.error(err);
});
