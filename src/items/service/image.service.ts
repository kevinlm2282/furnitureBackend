import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { ImageRepository } from '../repositories/image.repository'
import { randomUUID } from 'crypto'
import * as fs from 'node:fs/promises'
import { Image } from '../entities/image.entity'
import { join, resolve } from 'node:path'
import { PinoLogger } from 'nestjs-pino'

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private logger: PinoLogger,
  ) {}

  async createImage(file: Express.Multer.File) {
    const joinedPath = join(
      process.env.NFS_PATH || resolve(__dirname, '../../../uploads'),
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
      this.logger.error(error)
      try {
        await fs.unlink(`${joinedPath}/${uuid}`)
        throw new BadRequestException('Image error')
      } catch (error) {
        this.logger.error(error)
        throw new BadRequestException('Image error')
      }
    }
  }

  async getImageByUuid(uuid: string) {
    const image = await this.imageRepository.getImageByUuid(uuid)
    if (!image) {
      throw new NotFoundException('Image not found')
    }
    return image
  }

  async getImageById(id: number) {
    const image = await this.imageRepository.getImageById(id)
    if (!image) {
      throw new NotFoundException('Image not found')
    }
    return image
  }

  async deleteImage(id: number) {
    const image = await this.getImageById(id)
    try {
      const path = join(
        process.env.NFS_PATH || resolve(__dirname, '../../../uploads'),
        `/images`,
      )
      await fs.unlink(`${path}/${image.uuid}`)
    } catch {
      this.logger.info(`image doesnt exists`)
    }
    return await this.imageRepository.deleteImage(id)
  }
}
