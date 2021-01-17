import { AuthGuard } from '@nestjs/passport';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const ctx = gqlContext.getContext();
    ctx.req.body = gqlContext.getArgs();
    return ctx.req;
  }
}
