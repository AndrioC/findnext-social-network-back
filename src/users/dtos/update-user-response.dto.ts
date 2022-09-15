import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserResponse {
  @Field()
  name: string;

  @Field()
  email: string;
}
