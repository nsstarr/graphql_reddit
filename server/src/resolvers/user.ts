import { User } from "../entities/User"
import { MyContext } from "src/types"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql"
import argon2 from 'argon2'

//use for arfuments
@InputType() 
class UsernamePasswordInput {
    @Field()
    username: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

//return from mutations
@ObjectType()
class UserResponse {
    @Field(() => [Error, {nullable: true})
    errors?: Error[];

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver()
export default class UserResolver {

    @Mutation(() => User)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await argon2.hash(options.password)
        const user = em.create(User, { 
            username: options.username,
            password: hashedPassword });
        await em.persistAndFlush(user)
        return user;
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) : Promise<UserResponse>{
        const user = await em.findOne(User, {username: options.username});
        if(!user){
            return {
                errors:[{
                    field:"username",
                    message: "that username doesn't exist"
                }]
            }
        }

        const valid = await argon2.verify(user.password, options.password)
        return user;
    }
}

