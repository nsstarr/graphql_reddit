import { Entity, Property, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Post {

    @PrimaryKey()
    id!: number;

    @Property({type: "date", default: "NOW()"})
    createdAt?: Date = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt?: Date = new Date();

    @Property({type: "text"})
    title!: string;
    
}