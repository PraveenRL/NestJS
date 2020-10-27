import { Controller, Get, Post, Put, Delete, Body, Req, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';

import { CreateItemDto } from './dto/create-items.dto';
import { IItem } from './interfaces/items.interface';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {

  constructor(
    private readonly itemsService: ItemsService
  ) { }

  @Get()
  findAll(): Promise<IItem[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IItem> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.create(createItemDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateItemDto: CreateItemDto): Promise<IItem> {
    return this.itemsService.update(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<IItem> {
    return this.itemsService.delete(id);
  }

  @Get('express')
  expressWay(@Req() request: Request, @Res() response: Response): Response {
    return response.send('Get All Items');
  }

}
