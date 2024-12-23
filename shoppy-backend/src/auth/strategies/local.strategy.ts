import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  //whatever is returned automatically from validate function will be attached in "user" property of request
  //so after validate function executed, we always have "user" info in request
  async validate(username: string, password: string) {
    return this.authService.verifyUser(username, password);
  }
}
