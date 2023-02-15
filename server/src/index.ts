import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";


const main = async () => {
    const orm = await MikroORM.init({
        entities: {Post},
        dbName: "reddit",
        user: "",
        password: "",
        debug: !__prod__,
        type: "postgresql"
    });

    const post = orm.em.create(Post, {title: 'my first post'})
}

main()

console.log('hello world hey')
