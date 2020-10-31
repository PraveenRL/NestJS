import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Module({
  controllers: [PostsController],
  imports: [
    TypeOrmModule.forFeature([Post])
  ],
  providers: [PostsService]
})
export class PostsModule {}
