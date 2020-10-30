import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthGuard } from './auth.guard';

@Controller()
export class UserController {

  constructor(
    private readonly userServive: UserService
  ) { }

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: any): Promise<User> {
    return this.userServive.findOne({ username: data.username });
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  async greet(): Promise<string> {
    return 'Greetings  authenticated user';
  }

}
