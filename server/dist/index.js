"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = __importDefault(require("./resolvers/user"));
const cors_1 = __importDefault(require("cors"));
var session = require("express-session");
var MySQLStore = require("express-mysql-session")(session);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    const app = (0, express_1.default)();
    var options = {
        host: "localhost",
        port: 3306,
        user: "session_test",
        password: "password",
        database: "session_test"
    };
    var sessionStore = new MySQLStore(options);
    app.use(session({
        key: "session_cookie_name",
        secret: "session_cookie_secret",
        store: sessionStore,
        resave: false,
        saveUninitialized: false
    }));
    const generator = orm.getSchemaGenerator();
    yield generator.updateSchema();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.default],
            validate: false
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false
    });
    app.get("/", (_, res) => {
        res.send("hello!");
    });
    app.listen(4000, () => {
        console.log("listening on port 4000");
    });
});
main().catch((err) => {
    console.error(err);
});
console.log("hello world hey");
//# sourceMappingURL=index.js.map