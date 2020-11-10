import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";

export class PostNotFoundException1 extends HttpException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`, HttpStatus.NOT_FOUND);
  }
}

export class PostNotFoundException2 extends NotFoundException {
  constructor(postId: number) {
    super(`Post with id ${postId} not found`);
  }
}