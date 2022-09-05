import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class SignUpUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  password: string;
}
