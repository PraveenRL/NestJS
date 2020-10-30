import { TypeOrmModuleOptions } from "@nestjs/typeorm/dist/interfaces";

import { User } from "src/user/user.entity";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres1',
  database: 'nestjs',
  synchronize: true,
  entities: [User]
}