import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  Query,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'

import { ItemsService } from '../service/items.service'
// import { CreateItemDto } from '../dto/create-item.dto'
// import { UpdateItemDto } from '../dto/update-item.dto'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { CreateItemDto } from '../dto/create-item.dto'
import { Request } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { PinoLogger } from 'nestjs-pino'

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
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(+id)
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
  //   return this.itemsService.update(+id, updateItemDto)
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id)
  }
}
