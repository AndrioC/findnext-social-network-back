import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class CreatePlaceResponse {
  @Field()
  description: string;

  @Field()
  location: string;

  @Field(() => String)
  image: string;

  @Field()
  user: User;
}
