import { Controller, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) { }

  // @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Request() request) {
    return this.authService.login(request.body);
  }

  @MessagePattern({ role: 'auth', cmd: 'check'})
  async loggedIn(data) {
    try {
      const res = this.authService.validateToken(data.jwt);

      return res;
    } catch(e) {
      Logger.log(e);
      return false;
    }
  }
  
}
