import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

import { Stream } from 'stream';

interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}

@InputType()
export class CreatePlaceInput {
  @IsNumber()
  @Field()
  userId: number;

  @IsString()
  @Field()
  description: string;

  @IsString()
  @Field()
  location: string;

  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
