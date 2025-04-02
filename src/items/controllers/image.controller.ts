import {
  Controller,
  Get,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { ImageService } from '../service/image.service'
import { createReadStream } from 'fs'
import { join, resolve } from 'path'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('image')
@ApiTags('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/:uuid')
  @ApiOperation({
    summary: 'Get image by uuid',
    description: 'Get image by uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Image not found.' })
  async getFile(@Param('uuid') uuid: string) {
    const image = await this.imageService.getImageByUuid(uuid)
    const path = join(
      process.env.NFS_PATH || resolve(__dirname, '../../../uploads'),
      `/images`,
    )
    const file = createReadStream(join(path, image.uuid))
    return new StreamableFile(file, {
      type: image.format,
      disposition: `attachment; filename="${image.originalName}"`,
    })
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.imageService.createImage(file)
  }
}
