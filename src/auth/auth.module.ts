import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './at.strategy';
import { RtStrategy } from './rt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({})
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, AtStrategy, RtStrategy]
})
export class AuthModule { }
