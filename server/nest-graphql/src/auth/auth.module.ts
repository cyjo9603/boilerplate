import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
