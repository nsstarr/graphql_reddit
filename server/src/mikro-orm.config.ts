import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core"
import path, { dirname } from "path";

export default  {
    migrations: {
        path: path.join(__dirname,'./migrations'),

    },
    entities: [Post],
    dbName: "reddit",
    user: "",
    password: "",
    debug: !__prod__,
    type: "postgresql"
} as Parameters<typeof MikroORM.init>[0]