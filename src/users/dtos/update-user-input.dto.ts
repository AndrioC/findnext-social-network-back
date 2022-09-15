import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, IsOptional } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { Stream } from 'stream';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  avatar_image?: Promise<FileUpload>;

  @IsOptional()
  @Field(() => GraphQLUpload, { nullable: true })
  background_image?: Promise<FileUpload>;

  @IsString()
  @IsOptional()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsEmail()
  @Field({ nullable: true })
  email?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  password?: string;
}
