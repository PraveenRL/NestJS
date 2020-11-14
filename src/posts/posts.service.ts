import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, MoreThan } from 'typeorm';

import { User } from 'src/user/user.entity';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostNotFoundException1, PostNotFoundException2 } from './exception/post-not-found.exception';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) { }

  async getAllPostsLimitOffset(offset?: number, limit?: number, startId?: number) {
    const where: FindManyOptions<Post>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.postsRepository.count();
    }

    const [items, count] = await this.postsRepository.findAndCount({
      where,
      relations: ['author'],
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit
    });

    return {
      items,
      count: startId ? separateCount : count
    }
  }

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne(id, { relations: ['author'] });
    if (post) {
      return post;
    }
    throw new PostNotFoundException1(id);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = this.postsRepository.create({
      ...post,
      author: user
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async replacePost(id: number, post: UpdatePostDto) {
    await this.postsRepository.update(id, post);
    const updatedPost = await this.postsRepository.findOne(id, { relations: ['author'] });
    if (updatedPost) {
      return updatedPost;
    }
    throw new PostNotFoundException2(id);
  }

  async deletePost(id: number) {
    const deleteResponse = await this.postsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
