import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { MessagesUtils } from '../../utils/messages.utils';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.checkUser(email, password);

    if (!user) {
      throw new UnauthorizedException(MessagesUtils.INVALID_EMAIL_PASSWORD);
    }

    return user;
  }
}
