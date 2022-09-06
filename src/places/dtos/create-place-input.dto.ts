import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreatePlaceInput {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;
}
