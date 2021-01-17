import { Resolver, Query } from '@nestjs/graphql';

import { HelloOutput } from './dto/hello.dto';

@Resolver()
export class HelloResolver {
  @Query((returns) => HelloOutput)
  hello(): HelloOutput {
    return { message: 'hello nestjs' };
  }
}
