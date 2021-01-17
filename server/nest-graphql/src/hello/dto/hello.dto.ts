import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class HelloOutput {
  @Field((type) => String)
  message!: string;
}
