import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { compareSync } from 'bcrypt';

import { throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    try {
      const user = await this.client.send({ role: 'user', cmd: 'get' }, { username })
        .pipe(
          timeout(5000),
          catchError(error => {
            if (error instanceof TimeoutError) {
              return throwError(new RequestTimeoutException());
            }
            return throwError(error);
          }))
        .toPromise();

      if (compareSync(password, user?.password)) {
        return user;
      }

      return null;
    }
    catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async login(user) {
    const payload = { user, sub: user.id };

    return {
      userId: user.id,
      accessToken: this.jwtService.sign(payload)
    };
  }

  validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

}
