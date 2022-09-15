import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { createWriteStream } from 'fs';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { CurrentUser } from '../decorators/current-user.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserInput } from '../dtos/update-user-input.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  listAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  listUserData(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  createUser(@Args('createUser') user: CreateUserDto) {
    return this.usersService.create(user.email, user.name, user.password);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const { createReadStream, filename } = await data.avatar_image;
    const {
      createReadStream: createReadStreamBackImage,
      filename: filenameBackImage,
    } = await data.background_image;

    if (filename) {
      new Promise(async (resolve) =>
        createReadStream()
          .pipe(createWriteStream(`./src/uploads/${filename}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          }),
      );
    }

    if (filenameBackImage) {
      new Promise(async (resolve) =>
        createReadStreamBackImage()
          .pipe(createWriteStream(`./src/uploads/${filenameBackImage}`))
          .on('finish', () => resolve(true))
          .on('error', () => {
            new HttpException('Could not save image', HttpStatus.BAD_REQUEST);
          }),
      );
    }
    const user = this.usersService.update(id, {
      ...data,
      avatar_image: filename,
      background_image: filenameBackImage,
    });

    return user;
  }
}
