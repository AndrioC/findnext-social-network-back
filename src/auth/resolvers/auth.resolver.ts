import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { SignInResponse } from '../dtos/signin-response';
import { SignInUserInput } from '../dtos/signin-user.input';
import { SignUpUserInput } from '../dtos/signup-user.input';
import { GqlAuthGuard } from '../guards/auth-local-gql.guard';
import { AuthService } from '../services/auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => SignInResponse)
  @UseGuards(GqlAuthGuard)
  signin(@Args('signInUserInput') signInUserInput: SignInUserInput) {
    return this.authService.signin(signInUserInput);
  }

  @Mutation(() => User)
  signup(@Args('signUpUserInput') signUpUserInput: SignUpUserInput) {
    return this.authService.signup(
      signUpUserInput.email,
      signUpUserInput.name,
      signUpUserInput.password,
    );
  }
}
