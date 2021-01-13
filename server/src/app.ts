import "reflect-metadata";
import "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import schema from "./graphql";
import AuthService from "./services/AuthService";
import cookieParser from "cookie-parser";

const main = async () => {
  await createConnection();

  const app = express();
  app.use(cookieParser());
  app.post("/refresh_tokens", AuthService.refreshTokens);

  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app });

  app.listen(4000, () => console.log("🚀 Server ready at http://localhost:4000/graphql"));
};

main().catch((err) => {
  console.error(err);
});
