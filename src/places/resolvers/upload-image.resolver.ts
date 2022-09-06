import { HttpException, HttpStatus } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { join } from 'path';

@Resolver()
export class UploadImageResolver {
  @Mutation(() => Boolean)
  async uploadImage(
    @Args({ name: 'image', type: () => GraphQLUpload })
    { createReadStream, filename }: any,
  ): Promise<boolean> {
    return new Promise(async (resolve) => {
      createReadStream()
        .pipe(
          createWriteStream(join(process.cwd(), `./src/uploads/${filename}`)),
        )
        .on('finish', () => resolve(true))
        .on('error', () => {
          new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
        });
    });
  }
}
