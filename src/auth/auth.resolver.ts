import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { SignInDto } from 'src/dto/signin.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenResponse } from 'src/dto/token-response';
import { SignUpDto } from 'src/dto/signup.dto';
import { UserEntity } from 'entities/user.entity';
import { AtAuthGuard } from './at-auth.guard';
import { AuthResponse } from 'src/dto/auth-response';
import { RtAuthGuard } from './rt-auth.guard';

@Resolver(() => UserEntity)
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Query(() => TokenResponse)
    @UseGuards(LocalAuthGuard)
    signIn(
        @Args("signInDto") signInDto: SignInDto,
        @Context() context
    ): Promise<TokenResponse> {
        return this.authService.signIn(context.user);
    }

    @Mutation(() => TokenResponse)
    signUp(@Args("signUpDto") signUpDto: SignUpDto): Promise<TokenResponse> {
        return this.authService.signUp(signUpDto);
    }

    @Query(() => AuthResponse)
    @UseGuards(AtAuthGuard)
    auth(@Context() context): Promise<AuthResponse> {
        return context.req.user;
    }

    @Query(() => TokenResponse)
    @UseGuards(RtAuthGuard)
    refresh(@Context() context): Promise<TokenResponse> {
        return this.authService.refresh(context.req.user);
    }
}
