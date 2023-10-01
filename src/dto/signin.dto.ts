import { InputType , Field } from '@nestjs/graphql';
import { IsString , IsNotEmpty , MinLength } from 'class-validator';

@InputType()
export class SignInDto{
    @IsString()
    @IsNotEmpty()
    @Field()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Field()
    password: string;
}