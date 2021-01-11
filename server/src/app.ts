import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import schema from "./graphql";
import bodyParser from "body-parser";

const main = async () => {
  await createConnection();

  const app = express();

  app.use(bodyParser.json());

  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
  });

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Server ready at http://localhost:4000/graphql"));
};

main().catch((err) => {
  console.error(err);
});
