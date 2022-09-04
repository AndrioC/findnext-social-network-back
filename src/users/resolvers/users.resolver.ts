import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  listAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args('createUser') user: CreateUserDto): Promise<User> {
    return this.usersService.create(user.email, user.name, user.password);
  }
}
