import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common'

import { ItemsService } from '../service/items.service'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { CreateItemDto } from '../dto/create-item.dto'
import { Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { PinoLogger } from 'nestjs-pino'
import { UpdateItemDto } from '../dto/update-item.dto'

@Controller('items')
export class ItemsController {
  constructor(
    private readonly itemsService: ItemsService,
    private logger: PinoLogger,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: CreateItemDto,
    @Req() req: Request,
    @UploadedFile() image: Express.Multer.File,
  ) {
    // const user = req['user'] as { username: string; id: number; role: string }
    const item: CreateItemDto = { ...body }
    return await this.itemsService.create(item, 'ariel', image)
  }

  @Get()
  async findAll(@Query() queryParams: QueryParamsDto) {
    return await this.itemsService.findAll(queryParams)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.itemsService.getItemById(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @UploadedFile() image: Express.Multer.File,
    @Body() updateItemDto: UpdateItemDto,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    return await this.itemsService.updateItem(id, updateItemDto, 'ariel', image)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.itemsService.deleteItem(id)
  }
}
