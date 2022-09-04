import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../../users/decorators/current-user.decorator';
import { CreateUserDto } from '../../users/dtos/create-user.dto';
import { User } from '../../users/entities/user.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  async signIn(@CurrentUser() req: User) {
    return await this.authService.signin(req);
  }

  @Post('signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(
      body.email,
      body.name,
      body.password,
    );
    return user;
  }
}
