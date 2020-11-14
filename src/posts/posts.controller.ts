import {
  Body, Controller, Delete, Get, Param,
  Post, Put, UseGuards, Req, ClassSerializerInterceptor, UseInterceptors, Query
} from '@nestjs/common';

import { JwtAuthenticationGuard } from 'src/authentication/jwt-authentication.guard';
import { RequestWithUser } from 'src/authentication/interface/request-with-user.interface';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationParams } from './pagination-params';

@Controller('posts')
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(
    private readonly postsService: PostsService
  ) { }

  @Get()
  async getPosts(
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    return this.postsService.getAllPostsLimitOffset(offset, limit, startId);
  }

  @Get('all')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.replacePost(Number(id), post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
