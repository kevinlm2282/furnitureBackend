import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ImageRepository } from '../repositories/image.repository'
import { randomUUID } from 'crypto'
import * as fs from 'node:fs/promises'
import { Image } from '../entities/image.entity'
import * as path from 'node:path'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private logger: PinoLogger,
  ) {}

  async createImage(file: Express.Multer.File) {
    const joinedPath = path.join(
      process.env.NFS_PATH || path.resolve(__dirname, '../../../uploads'),
      `/images`,
    )
    const uuid = randomUUID()
    try {
      await fs.mkdir(joinedPath, { recursive: true })
      await fs.writeFile(`${joinedPath}/${uuid}`, Buffer.from(file.buffer))

      const image = new Image({
        format: file.mimetype,
        uuid: uuid,
        originalName: file.originalname,
      })
      this.logger.info(`image ${JSON.stringify(image)}`)
      this.logger.info(`originalName ${file.originalname}`)
      return await this.imageRepository.createImage(image)
    } catch (error) {
      await fs.unlink(`${joinedPath}/${uuid}`)
      this.logger.error(error)
      throw new BadRequestException('Image error')
    }
  }

  async getImageByUuid(uuid: string) {
    const image = await this.imageRepository.getImageByUuid(uuid)
    if (!image) {
      throw new NotFoundException('Image not found')
    }
    return image
  }
}
