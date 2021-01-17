import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private configService: ConfigService) {
    super();
  }

  handleRequest(err: unknown, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    const header = this.configService.get<string>('JWT_HEADER') || 'jwt';
    const authCookie = ctx.req.cookies[header];

    if (authCookie) {
      ctx.req.headers.authorization = `Bearer ${authCookie}`;
    }

    return ctx.req;
  }
}
