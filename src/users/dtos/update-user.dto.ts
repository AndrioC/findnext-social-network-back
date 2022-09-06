import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsString()
  @IsOptional()
  @Field()
  name?: string;

  @IsEmail()
  @IsOptional()
  @Field()
  email?: string;

  @IsString()
  @IsOptional()
  @Field()
  password?: string;
}
