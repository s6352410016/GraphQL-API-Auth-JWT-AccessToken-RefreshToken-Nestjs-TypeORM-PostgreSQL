import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from '@nestjs/common';
import { TokenDecodedPayload } from "src/dto/token-decoded-payload";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy , "jwt-refresh"){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.REFRESH_TOKEN_SECRET,
        });
    }

    async validate(payload: TokenDecodedPayload){
        return {
            fullname: payload.fullname,
            username: payload.username
        }
    }
}