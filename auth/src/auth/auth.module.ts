import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import constants from './constants';

@Module({
  controllers: [AuthController],
  imports: [
    ClientsModule.register([
      {
        name: 'USER_CLIENT',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 4010
        }
      }
    ]),
    JwtModule.register({
      secret: constants.jwtSecret,
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy
  ],
})
export class AuthModule { }
