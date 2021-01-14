import "reflect-metadata";
import "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import schema from "./graphql";
import cookieParser from "cookie-parser";
import cors from "cors";

const main = async () => {
  await createConnection();

  const app = express();

  app.use(cookieParser());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

  const server = new ApolloServer({
    schema,
    playground: {
      settings: {
        "request.credentials": "include",
      },
    },
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("🚀 Server ready at http://localhost:4000/graphql"));
};

main().catch((err) => {
  console.error(err);
});
