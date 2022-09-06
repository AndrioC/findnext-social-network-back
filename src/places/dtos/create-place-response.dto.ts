import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class CreatePlaceResponse {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => User)
  user: User;
}
