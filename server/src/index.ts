import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import UserResolver from "./resolvers/user";
import cors from "cors";
import { MyContext } from "./types";
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  var options = {
    host: "localhost",
    port: 3306,
    user: "session_test",
    password: "password",
    database: "session_test",
    checkExpirationInterval: 1000 * 60 * 60 * 2,
    expiration: 1000 * 60 * 60 * 24
  };

  var sessionStore = new MySQLStore(options);

  app.use(
    session({
      key: "session_cookie_name",
      secret: "session_cookie_secret",
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
       cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  const generator = orm.getSchemaGenerator();
  await generator.updateSchema();

  app.use(
    cors({
      origin: true,
      credentials: true
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res,
     })
  });

  await apolloServer.start();

// const corsOptions = { origin: "http://localhost:3000", credentials: true };

apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.get("/", (_, res) => {
    res.send("hello!");
  });
  app.listen(4000, () => {
    console.log("listening on port 4000");
  });
};

main().catch((err) => {
  console.error(err);
});

console.log("hello world hey");
