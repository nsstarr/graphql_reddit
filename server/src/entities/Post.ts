import { Entity, SerializedPrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

    @SerializedPrimaryKey()
    id!: number;

    @Property()
    createdAt?: Date = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt?: Date = new Date();

    @Property()
    title!: string;
    
}