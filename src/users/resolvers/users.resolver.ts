import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/auth-jwt-gql.guard';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserInput } from '../dtos/update-user.dto';
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

  @Mutation(() => User)
  createUser(@Args('createUser') user: CreateUserDto) {
    return this.usersService.create(user.email, user.name, user.password);
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    const user = this.usersService.update(id, data);

    return user;
  }
}
