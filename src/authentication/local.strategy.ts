import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "src/user/user.entity";
import { AuthenticationService } from "./authentication.service";

export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(
    private authenticationService: AuthenticationService
  ) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authenticationService.getAuthenticatedUser(email, password);
  }

}