import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenResponse } from 'src/dto/token-response';
import { SignUpDto } from 'src/dto/signup.dto';
import { AuthResponse } from 'src/dto/auth-response';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async createToken(fullname: string, username: string): Promise<TokenResponse> {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(
                {
                    fullname,
                    username
                },
                {
                    expiresIn: "300s",
                    secret: process.env.ACCESS_TOKEN_SECRET
                }
            ),
            this.jwtService.signAsync(
                {
                    fullname,
                    username
                },
                {
                    expiresIn: "1h",
                    secret: process.env.REFRESH_TOKEN_SECRET
                }
            )
        ]);
        return {
            access_token,
            refresh_token
        }
    }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findWithUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            const { password, ...otherDetail } = user;
            return otherDetail;
        }
        return null;
    }

    async checkUserSignUp(username: string) {
        return await this.userService.findWithUsername(username);
    }

    async signIn(user: UserEntity): Promise<TokenResponse> {
        return await this.createToken(user.fullname, user.username);
    }

    async signUp(signUpDto: SignUpDto): Promise<TokenResponse> {
        const { username } = signUpDto;
        const user = await this.userService.findWithUsername(username);
        if (user !== null) {
            throw new BadRequestException();
        }
        const userData = await this.userService.signUp(signUpDto);
        return await this.createToken(userData.fullname, userData.username);
    }

    async refresh(user: AuthResponse): Promise<TokenResponse> {
        const { fullname, username } = user;
        return await this.createToken(fullname, username);
    }
}