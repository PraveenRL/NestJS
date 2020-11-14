import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { Address } from './address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Address
    ])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
