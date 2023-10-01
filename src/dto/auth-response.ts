import { ObjectType , Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse{
    @Field()
    fullname: string;

    @Field()
    username: string;
}