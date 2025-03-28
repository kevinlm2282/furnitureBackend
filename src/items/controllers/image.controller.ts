import { Controller, Get, Param, StreamableFile } from '@nestjs/common'
import { ImageService } from '../service/image.service'
import { createReadStream } from 'fs'
import { join, resolve } from 'path'

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Get('/:uuid')
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
}
