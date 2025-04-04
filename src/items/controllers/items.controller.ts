import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'

import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Request } from 'express'
import { AuthGuard } from 'src/auth/guards/auth.guard'
import { CasbinGuard } from 'src/auth/guards/casbin.guard'
import { QueryParamsDto } from 'src/core/dto/query_params.dto'
import { CreateItemDto } from '../dto/create-item.dto'
import { UpdateItemDto } from '../dto/update-item.dto'
import { ItemsService } from '../service/items.service'

@Controller('items')
@UseGuards(AuthGuard, CasbinGuard)
@ApiTags('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Create an item',
    description: 'Create an item with an image',
  })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unathorize' })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Invalid data provided.',
  })
  @ApiBody({
    description: 'Item data',
    type: CreateItemDto,
  })
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() body: CreateItemDto,
    @Req() req: Request,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .addFileTypeValidator({
          fileType: 'image/jpeg|image/png',
        })
        .build(),
    )
    image: Express.Multer.File,
  ) {
    const user = req['user'] as { username: string; id: number; role: string }
    const item: CreateItemDto = { ...body }
    return await this.itemsService.create(item, user.username, image)
  }

  @Get()
  @ApiOperation({
    summary: 'Get all items',
    description: 'Get all items with pagination and filtering',
  })
  @ApiResponse({
    status: 200,
    description: 'The items have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiParam({
    name: 'QueryParams',
    description: 'Query parameters for filtering and pagination',
    required: false,
    type: QueryParamsDto,
  })
  async findAll(@Query() queryParams: QueryParamsDto) {
    return await this.itemsService.findAll(queryParams)
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an item by ID',
    description: 'Retrieve an item by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiResponse({
    status: 404,
    description: 'Item not found',
  })
  @ApiParam({
    name: 'id',
    description: 'ID of the item to retrieve',
    required: true,
    type: Number,
  })
  findOne(@Param('id') id: number) {
    return this.itemsService.getItemById(id)
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({
    summary: 'Update an item',
    description: 'Update an item with an image',
  })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  @ApiBody({
    description: 'Item data',
    type: UpdateItemDto,
  })
  @ApiConsumes('multipart/form-data')
  async update(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 })
        .addFileTypeValidator({
          fileType: 'image/jpeg|png',
        })
        .build(),
    )
    image: Express.Multer.File,
    @Body() updateItemDto: UpdateItemDto,
    @Param('id') id: number,
    @Req() req: Request,
  ) {
    const user = req['user'] as { id: number; role: string; username: string }
    return await this.itemsService.updateItem(
      id,
      updateItemDto,
      user.username,
      image,
    )
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an item',
    description: 'Delete an item by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 401, description: 'Unathorized' })
  async remove(@Param('id') id: number) {
    return await this.itemsService.deleteItem(id)
  }
}
