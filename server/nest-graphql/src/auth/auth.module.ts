import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({ secret: process.env.JWT_SECRET })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
