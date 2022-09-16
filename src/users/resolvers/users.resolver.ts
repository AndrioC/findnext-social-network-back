import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { S3Service } from '../../s3/services/s3.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserInput } from '../dtos/update-user-input.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { v4 as uuidv4 } from 'uuid';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private s3Service: S3Service,
    private configService: ConfigService,
  ) {}

  @Query(() => [User])
  listAll() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  listUserData(@Args('id') id: number) {
    return this.usersService.findOne(id);
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
    const { createReadStream, filename, mimetype } = await data.avatar_image;
    const {
      createReadStream: createReadStreamBackImage,
      filename: filenameBackImage,
    } = await data.background_image;

    const bucketName = this.configService.get<string>('USER_IMAGES');
    const hashProfileFilename = `${uuidv4()}-profile`;
    const hashProfileBackgroundImage = `${uuidv4()}-back-image`;

    if (filename) {
      const params = {
        Bucket: bucketName,
        Key: hashProfileFilename,
        Body: createReadStream(),
        ContentType: mimetype,
      };

      await this.s3Service.uploadFile({ params });
    }

    if (filenameBackImage) {
      const params = {
        Bucket: bucketName,
        Key: hashProfileBackgroundImage,
        Body: createReadStreamBackImage(),
        ContentType: mimetype,
      };

      await this.s3Service.uploadFile({ params });
    }
    const user = this.usersService.update(id, {
      ...data,
      avatar_image: hashProfileFilename,
      background_image: hashProfileBackgroundImage,
    });

    return user;
  }
}
