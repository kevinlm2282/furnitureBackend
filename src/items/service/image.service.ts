import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { ImageRepository } from '../repositories/image.repository'
import { randomUUID } from 'crypto'
import * as fs from 'node:fs/promises'
import { Image } from '../entities/image.entity'
import { join, resolve } from 'node:path'
import { PinoLogger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private logger: PinoLogger,
    private configService: ConfigService,
    @Inject('S3_CLIENT')
    private s3Client: S3Client,
  ) {}

  async createImage(file: Express.Multer.File) {
    const uuid = randomUUID()
    const bucketName = this.configService.get<string>('AWS_BUCKET_NAME')
    const fileName = `${uuid}-${file.originalname}`

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
    await this.s3Client.send(new PutObjectCommand(params))
    const image = new Image({
      format: file.mimetype,
      uuid: uuid,
      originalName: file.originalname,
    })
    this.logger.info(`image ${JSON.stringify(image)}`)
    this.logger.info(`originalName ${file.originalname}`)
    return await this.imageRepository.createImage(image)
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
